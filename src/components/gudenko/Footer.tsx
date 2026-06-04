"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Download, Code2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadProject = async () => {
    setIsDownloading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 min timeout
      
      const response = await fetch('/api/download-project', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gudenko-fund-project.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        alert('Превышено время ожидания. Попробуйте позже.');
      } else {
        alert('Ошибка при скачивании проекта. Попробуйте позже.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <footer id="contact" className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <img 
                src="/images/logo.jpg" 
                alt="Фонд Гуденко" 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="font-display text-xl font-bold">
                Фонд Гуденко
              </span>
            </a>
            <p className="text-white/60 max-w-md leading-relaxed mb-6">
              Семейный благотворительный фонд. Помогаем вместе уже более 10 лет. 
              Здравоохранение, образование, экология — меняем жизни к лучшему.
            </p>
            
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-white/40">Способы оплаты:</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">СБП</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Карта</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Apple Pay</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Google Pay</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-6">О фонде</h4>
            <ul className="space-y-3">
              {["Наследие", "Направления", "Команда", "Документы", "Отчёты"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@gudenko.fund"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#E62129]" />
                  info@gudenko.fund
                </a>
              </li>
              <li>
                <a
                  href="tel:+78001234567"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#3A5FCD]" />
                  8 (800) 123-45-67
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-5 h-5 text-[#7CDA28]" />
                  Москва, Россия
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://vk.com/gudenko_fund"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4A76A8] transition-colors"
                aria-label="VK"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.189 1.366 1.26 2.18 1.817.616.422 1.084.33 1.084.33l2.178-.03s1.14-.071.599-.973c-.044-.074-.314-.667-1.616-1.89-1.363-1.35-1.18-1.132.461-3.47.999-1.343 1.399-2.163 1.274-2.515-.12-.336-.856-.247-.856-.247l-2.45.015s-.182-.025-.317.056c-.131.079-.216.262-.216.262s-.387 1.028-.903 1.903c-1.088 1.848-1.523 1.946-1.7 1.832-.413-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.532-2.733-.267-.064-.463-.106-1.146-.113-.876-.009-1.618.003-2.037.208-.279.137-.494.442-.363.46.162.022.529.099.724.363.251.341.243 1.105.243 1.105s.145 2.108-.337 2.37c-.331.181-.786-.188-1.762-1.873-.5-.86-.878-1.81-.878-1.81s-.073-.178-.203-.274c-.158-.116-.378-.153-.378-.153l-2.327.015s-.349.01-.477.162c-.114.135-.009.414-.009.414s1.82 4.258 3.88 6.403c1.889 1.967 4.032 1.838 4.032 1.838h.972z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0088cc] transition-colors"
                aria-label="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <p>© {currentYear} Фонд Гуденко. Все права защищены.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Оферта
              </a>
              
              {/* For Developers Button */}
              <button
                onClick={handleDownloadProject}
                disabled={isDownloading}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                  "bg-gradient-to-r from-[#7CDA28] to-[#F7E934]",
                  "text-foreground font-semibold text-xs",
                  "hover:shadow-lg hover:scale-105",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
                title="Скачать исходный код проекта"
              >
                <Code2 className="w-4 h-4" />
                {isDownloading ? (
                  <>
                    <Download className="w-4 h-4 animate-bounce" />
                    Скачивание...
                  </>
                ) : (
                  "Для разработчиков"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
