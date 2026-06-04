import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration
const EMAIL_TO = "gudenko.blago@mail.ru";

// Create transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mail.ru",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });
}

interface EmailData {
  type: "help" | "volunteer";
  name: string;
  phone: string;
  email?: string;
  situation?: string;
  areas?: string[];
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: EmailData = await request.json();

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    // Check SMTP credentials
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP credentials not configured");
      // For development: log the data instead of sending
      console.log("=== EMAIL DATA (Development Mode) ===");
      console.log("Type:", data.type);
      console.log("Name:", data.name);
      console.log("Phone:", data.phone);
      console.log("Email:", data.email);
      console.log("Situation:", data.situation);
      console.log("Areas:", data.areas);
      console.log("Message:", data.message);
      
      return NextResponse.json({ 
        success: true, 
        message: "Заявка принята (режим разработки - проверьте консоль)" 
      });
    }

    const transporter = createTransporter();

    // Build email content
    let subject = "";
    let htmlContent = "";

    if (data.type === "help") {
      subject = "🆘 Новая заявка на получение помощи";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3A5FCD; border-bottom: 2px solid #3A5FCD; padding-bottom: 10px;">
            Новая заявка на получение помощи
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Имя:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Телефон:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${data.phone}" style="color: #3A5FCD;">${data.phone}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Описание ситуации:</h3>
            <p style="white-space: pre-wrap;">${data.situation || "Не указано"}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Заявка получена с сайта Фонда Гуденко: ${new Date().toLocaleString("ru-RU")}
          </p>
        </div>
      `;
    } else if (data.type === "volunteer") {
      const areasText = data.areas?.length 
        ? data.areas.map(a => {
            const labels: Record<string, string> = {
              events: "Организация мероприятий",
              delivery: "Доставка и логистика",
              admin: "Административная помощь",
              professional: "Профессиональные услуги",
              other: "Другое"
            };
            return labels[a] || a;
          }).join(", ")
        : "Не выбраны";

      subject = "🙋 Новая заявка от волонтёра";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7CDA28; border-bottom: 2px solid #7CDA28; padding-bottom: 10px;">
            Новая заявка от волонтёра
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Имя:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Телефон:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${data.phone}" style="color: #7CDA28;">${data.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.email}" style="color: #7CDA28;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Направления:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${areasText}</td>
            </tr>
          </table>
          ${data.message ? `
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">О себе:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ""}
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Заявка получена с сайта Фонда Гуденко: ${new Date().toLocaleString("ru-RU")}
          </p>
        </div>
      `;
    }

    // Send email
    await transporter.sendMail({
      from: `"Фонд Гуденко" <${process.env.SMTP_USER}>`,
      to: EMAIL_TO,
      subject: subject,
      html: htmlContent,
      replyTo: data.email || undefined,
    });

    return NextResponse.json({ success: true, message: "Письмо отправлено" });

  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке письма" },
      { status: 500 }
    );
  }
}
