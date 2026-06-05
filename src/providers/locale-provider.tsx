"use client";

import * as React from "react";

type Locale = "ru" | "en";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = React.createContext<LocaleContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Locale, Record<string, string>> = {
  ru: {
    // Header
    "nav.healthcare": "Здравоохранение",
    "nav.education": "Образование",
    "nav.ecology": "Экология",
    "nav.donate": "Пожертвовать",
    "nav.help": "Получить помощь",
    "nav.volunteer": "Стать волонтёром",
    "nav.menu": "Меню",
    
    // Hero
    "hero.title1": "Помогаем вместе —",
    "hero.title2": "меняем жизни",
    "hero.description": "Семейный благотворительный фонд, который поддерживает людей в трудных жизненных ситуациях. Здравоохранение, образование, экология — вместе мы создаём будущее.",
    "hero.donate": "Пожертвовать",
    "hero.shop": "Магазин игрушек",
    "hero.families": "семей поддержано",
    "hero.years": "лет работы",
    "hero.directions": "направления",
    
    // Heritage
    "heritage.title1": "Семья Гуденко —",
    "heritage.title2": "это помощь с душой",
    "heritage.p1": "Мы — семейный благотворительный фонд, который помогает людям в трудных жизненных ситуациях. Уже более 10 лет мы поддерживаем семьи по всей России.",
    "heritage.p2": "Для нас помощь — это не разовый поступок, а долгосрочные отношения. Мы верим в прозрачность каждого рубля и силу личного примера.",
    "heritage.quote": "Настоящее богатство измеряется количеством жизней, которым мы смогли помочь.",
    "heritage.quoteAuthor": "Семья Гуденко",
    "heritage.years": "лет работы",
    "heritage.families": "семей",
    "heritage.projects": "проектов",
    
    // Pillars
    "pillars.title": "Наши направления",
    "pillars.subtitle": "Работаем по нескольким ключевым направлениям, чтобы оказывать комплексную помощь",
    "pillars.more": "Подробнее",
    "pillars.programs": "Программы",
    "pillars.help": "Помочь",
    "pillars.close": "Закрыть",
    
    // Marketplace
    "shop.title": "Магазин Гудиков",
    "shop.subtitle": "Мягкие игрушки Гудики ручной работы. Каждый Гудик — это уникальный персонаж со своим характером и историей.",
    "shop.all": "Все",
    "shop.buy": "Купить",
    "shop.wait": "Ожидайте",
    "shop.outOfStock": "Нет в наличии",
    "shop.new": "Новинка",
    "shop.inStock": "В наличии",
    "shop.charity": "100% в благотворительность",
    "shop.charityDesc": "Все средства от продажи Гудиков направляются на помощь нуждающимся",
    
    // Impact
    "impact.title": "Результаты работы",
    "impact.subtitle": "Цифры, за которыми стоят реальные истории людей",
    
    // CTA
    "cta.donate.title": "ПОЖЕРТВОВАТЬ",
    "cta.donate.description": "Каждое пожертвование — это реальная помощь тем, кто в ней нуждается. Поддержите наши программы любой суммой.",
    "cta.donate.button": "Пожертвовать",
    "cta.help.title": "ПОЛУЧИТЬ ПОМОЩЬ",
    "cta.help.description": "Если вы оказались в трудной жизненной ситуации, мы готовы помочь. Оставьте заявку, и мы свяжемся с вами.",
    "cta.help.button": "Оставить заявку",
    "cta.volunteer.title": "СТАТЬ ВОЛОНТЁРОМ",
    "cta.volunteer.description": "Присоединяйтесь к нашей команде! Вместе мы можем сделать больше. Станьте частью большого доброго дела.",
    "cta.volunteer.button": "Стать волонтёром",
    
    // Donation Modal
    "donation.amount": "Сумма пожертвования",
    "donation.other": "Другая сумма",
    "donation.important": "Важно:",
    "donation.importantText": "После нажатия кнопки вы будете перенаправлены на защищённую страницу оплаты Альфа-Банка. Чек об оплате придёт на вашу электронную почту от банка.",
    "donation.pay": "Оплатить",
    "donation.redirecting": "Переход к оплате...",
    "donation.redirectText": "Окно оплаты откроется в новой вкладке",
    
    // Help Modal
    "help.name": "Ваше имя",
    "help.namePlaceholder": "Как к вам обращаться?",
    "help.phone": "Телефон",
    "help.situation": "Опишите вашу ситуацию",
    "help.situationPlaceholder": "Расскажите, чем мы можем вам помочь...",
    "help.send": "Отправить заявку",
    "help.sending": "Отправка...",
    "help.success": "Заявка отправлена!",
    "help.successText": "Мы свяжемся с вами в ближайшее время",
    
    // Volunteer Modal
    "volunteer.name": "Ваше имя",
    "volunteer.namePlaceholder": "Как к вам обращаться?",
    "volunteer.phone": "Телефон",
    "volunteer.email": "Email",
    "volunteer.areas": "Как вы хотите помочь?",
    "volunteer.areas.events": "Организация мероприятий",
    "volunteer.areas.delivery": "Доставка и логистика",
    "volunteer.areas.admin": "Административная помощь",
    "volunteer.areas.professional": "Профессиональные услуги",
    "volunteer.areas.other": "Другое",
    "volunteer.about": "О себе (необязательно)",
    "volunteer.aboutPlaceholder": "Расскажите о себе, своём опыте или мотивации...",
    "volunteer.join": "Стать волонтёром",
    "volunteer.sending": "Отправка...",
    "volunteer.success": "Добро пожаловать в команду!",
    "volunteer.successText": "Мы свяжемся с вами в ближайшее время",
    
    // Stories
    "stories.title": "Истории людей",
    "stories.subtitle": "За каждой цифрой в нашей статистике стоит живой человек со своей историей",
    "stories.read": "Читать историю",
    "stories.all": "Все истории",
    "stories.years": "лет",
    
    // Footer
    "footer.description": "Семейный благотворительный фонд. Помогаем вместе уже более 10 лет. Здравоохранение, образование, экология — меняем жизни к лучшему.",
    "footer.paymentMethods": "Способы оплаты:",
    "footer.about": "О фонде",
    "footer.heritage": "Наследие",
    "footer.directions": "Направления",
    "footer.team": "Команда",
    "footer.documents": "Документы",
    "footer.reports": "Отчёты",
    "footer.contacts": "Контакты",
    "footer.copyright": "Фонд Гуденко. Все права защищены.",
    "footer.privacy": "Политика конфиденциальности",
    "footer.offer": "Оферта",
    "footer.together": "Вместе мы делаем мир лучше",
    
    // Product Modal
    "product.quantity": "Количество:",
    "product.buy": "Купить за",
    "product.characteristics": "Характеристики:",
    "product.height": "Высота:",
    "product.material": "Материал:",
    "product.filler": "Наполнитель:",
    "product.sku": "Артикул:",
    "product.description": "Описание",
    "product.createdWithLove": "С любовью создан",
    "product.giftWrap": "Подарочная упаковка",
    "product.charity": "100% в благотворительность",
    "product.delivery": "Доставка по России",
  },
  en: {
    // Header
    "nav.healthcare": "Healthcare",
    "nav.education": "Education",
    "nav.ecology": "Ecology",
    "nav.donate": "Donate",
    "nav.help": "Get Help",
    "nav.volunteer": "Volunteer",
    "nav.menu": "Menu",
    
    // Hero
    "hero.title1": "Helping together —",
    "hero.title2": "changing lives",
    "hero.description": "A family charitable foundation that supports people in difficult life situations. Healthcare, education, ecology — together we create the future.",
    "hero.donate": "Donate",
    "hero.shop": "Toy Shop",
    "hero.families": "families supported",
    "hero.years": "years of work",
    "hero.directions": "directions",
    
    // Heritage
    "heritage.title1": "The Gudenko Family —",
    "heritage.title2": "help with soul",
    "heritage.p1": "We are a family charitable foundation that helps people in difficult life situations. For over 10 years, we have been supporting families across Russia.",
    "heritage.p2": "For us, help is not a one-time act, but long-term relationships. We believe in transparency of every ruble and the power of personal example.",
    "heritage.quote": "True wealth is measured by the number of lives we have been able to help.",
    "heritage.quoteAuthor": "The Gudenko Family",
    "heritage.years": "years of work",
    "heritage.families": "families",
    "heritage.projects": "projects",
    
    // Pillars
    "pillars.title": "Our Directions",
    "pillars.subtitle": "We work in several key areas to provide comprehensive assistance",
    "pillars.more": "Learn more",
    "pillars.programs": "Programs",
    "pillars.help": "Help",
    "pillars.close": "Close",
    
    // Marketplace
    "shop.title": "Gudiki Shop",
    "shop.subtitle": "Handmade soft toys Gudiki. Each Gudik is a unique character with its own personality and story.",
    "shop.all": "All",
    "shop.buy": "Buy",
    "shop.wait": "Wait",
    "shop.outOfStock": "Out of stock",
    "shop.new": "New",
    "shop.inStock": "In stock",
    "shop.charity": "100% to charity",
    "shop.charityDesc": "All proceeds from Gudiki sales go to help those in need",
    
    // Impact
    "impact.title": "Our Results",
    "impact.subtitle": "Numbers behind which stand real stories of people",
    
    // CTA
    "cta.donate.title": "DONATE",
    "cta.donate.description": "Every donation is real help for those who need it. Support our programs with any amount.",
    "cta.donate.button": "Donate",
    "cta.help.title": "GET HELP",
    "cta.help.description": "If you find yourself in a difficult life situation, we are ready to help. Leave a request and we will contact you.",
    "cta.help.button": "Submit Request",
    "cta.volunteer.title": "BECOME A VOLUNTEER",
    "cta.volunteer.description": "Join our team! Together we can do more. Become part of a big good cause.",
    "cta.volunteer.button": "Become a Volunteer",
    
    // Donation Modal
    "donation.amount": "Donation amount",
    "donation.other": "Other amount",
    "donation.important": "Important:",
    "donation.importantText": "After clicking the button, you will be redirected to the secure Alfa-Bank payment page. The receipt will be sent to your email by the bank.",
    "donation.pay": "Pay",
    "donation.redirecting": "Redirecting to payment...",
    "donation.redirectText": "Payment window will open in a new tab",
    
    // Help Modal
    "help.name": "Your name",
    "help.namePlaceholder": "How should we address you?",
    "help.phone": "Phone",
    "help.situation": "Describe your situation",
    "help.situationPlaceholder": "Tell us how we can help you...",
    "help.send": "Send Request",
    "help.sending": "Sending...",
    "help.success": "Request Sent!",
    "help.successText": "We will contact you soon",
    
    // Volunteer Modal
    "volunteer.name": "Your name",
    "volunteer.namePlaceholder": "How should we address you?",
    "volunteer.phone": "Phone",
    "volunteer.email": "Email",
    "volunteer.areas": "How do you want to help?",
    "volunteer.areas.events": "Event organization",
    "volunteer.areas.delivery": "Delivery and logistics",
    "volunteer.areas.admin": "Administrative assistance",
    "volunteer.areas.professional": "Professional services",
    "volunteer.areas.other": "Other",
    "volunteer.about": "About yourself (optional)",
    "volunteer.aboutPlaceholder": "Tell us about yourself, your experience or motivation...",
    "volunteer.join": "Become a Volunteer",
    "volunteer.sending": "Sending...",
    "volunteer.success": "Welcome to the team!",
    "volunteer.successText": "We will contact you soon",
    
    // Stories
    "stories.title": "People's Stories",
    "stories.subtitle": "Behind every number in our statistics is a living person with their own story",
    "stories.read": "Read Story",
    "stories.all": "All Stories",
    "stories.years": "years",
    
    // Footer
    "footer.description": "Family charitable foundation. Helping together for over 10 years. Healthcare, education, ecology — changing lives for the better.",
    "footer.paymentMethods": "Payment methods:",
    "footer.about": "About Foundation",
    "footer.heritage": "Heritage",
    "footer.directions": "Directions",
    "footer.team": "Team",
    "footer.documents": "Documents",
    "footer.reports": "Reports",
    "footer.contacts": "Contacts",
    "footer.copyright": "Gudenko Foundation. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.offer": "Offer",
    "footer.together": "Together we make the world better",
    
    // Product Modal
    "product.quantity": "Quantity:",
    "product.buy": "Buy for",
    "product.characteristics": "Characteristics:",
    "product.height": "Height:",
    "product.material": "Material:",
    "product.filler": "Filler:",
    "product.sku": "SKU:",
    "product.description": "Description",
    "product.createdWithLove": "Created with love",
    "product.giftWrap": "Gift wrapping",
    "product.charity": "100% to charity",
    "product.delivery": "Delivery across Russia",
  },
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>("ru");

  const t = React.useCallback((key: string): string => {
    return translations[locale][key] || key;
  }, [locale]);

  // Load locale from localStorage on mount
  React.useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "ru" || savedLocale === "en")) {
      setLocale(savedLocale);
    }
  }, []);

  // Save locale to localStorage when changed
  const handleSetLocale = React.useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
