"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart, Phone, Users, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CTASectionProps {
  variant: "donate" | "help" | "volunteer";
}

const ctaConfigs = {
  donate: {
    id: "donate",
    gradient: "from-[#E62129] to-[#F15A29]",
    icon: Heart,
    title: "ПОЖЕРТВОВАТЬ",
    description: "Каждое пожертвование — это реальная помощь тем, кто в ней нуждается. Поддержите наши программы любой суммой.",
    buttonText: "Пожертвовать",
    buttonGradient: "from-white to-gray-100",
    buttonTextColor: "text-[#E62129]",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  help: {
    id: "help",
    gradient: "from-[#3A5FCD] to-[#5A7FDD]",
    icon: Phone,
    title: "ПОЛУЧИТЬ ПОМОЩЬ",
    description: "Если вы оказались в трудной жизненной ситуации, мы готовы помочь. Оставьте заявку, и мы свяжемся с вами.",
    buttonText: "Оставить заявку",
    buttonGradient: "from-white to-gray-100",
    buttonTextColor: "text-[#3A5FCD]",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  volunteer: {
    id: "volunteer",
    gradient: "from-[#7CDA28] to-[#F7E934]",
    icon: Users,
    title: "СТАТЬ ВОЛОНТЁРОМ",
    description: "Присоединяйтесь к нашей команде! Вместе мы можем сделать больше. Станьте частью большого доброго дела.",
    buttonText: "Стать волонтёром",
    buttonGradient: "from-white to-gray-100",
    buttonTextColor: "text-foreground",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
};

const donationAmounts = [
  { value: 500, label: "500 ₽" },
  { value: 1000, label: "1 000 ₽" },
  { value: 3000, label: "3 000 ₽" },
  { value: 5000, label: "5 000 ₽" },
];

const volunteerAreas = [
  { id: "events", label: "Организация мероприятий" },
  { id: "delivery", label: "Доставка и логистика" },
  { id: "admin", label: "Административная помощь" },
  { id: "professional", label: "Профессиональные услуги" },
  { id: "other", label: "Другое" },
];

export function CTASection({ variant }: CTASectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  
  // Form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [situation, setSituation] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedAmount, setSelectedAmount] = React.useState<number>(1000);
  const [customAmount, setCustomAmount] = React.useState("");
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const config = ctaConfigs[variant];
  const Icon = config.icon;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSituation("");
    setMessage("");
    setSelectedAmount(1000);
    setCustomAmount("");
    setSelectedAreas([]);
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setModalOpen(false);
      resetForm();
    }, 2000);
  };

  const toggleArea = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };

  const renderModalContent = () => {
    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {variant === "donate" && "Спасибо за вашу помощь!"}
            {variant === "help" && "Заявка отправлена!"}
            {variant === "volunteer" && "Добро пожаловать в команду!"}
          </h3>
          <p className="text-muted-foreground">
            {variant === "donate" && "Мы отправили подтверждение на вашу почту"}
            {variant === "help" && "Мы свяжемся с вами в ближайшее время"}
            {variant === "volunteer" && "Мы свяжемся с вами в ближайшее время"}
          </p>
        </div>
      );
    }

    return (
      <>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.iconBg)}>
              <Icon className={cn("w-5 h-5", config.iconColor)} />
            </div>
            <DialogTitle className="text-2xl">{config.buttonText}</DialogTitle>
          </div>
          <DialogDescription>
            {variant === "donate" && "Выберите сумму или введите свою. Каждое пожертвование идёт на помощь нуждающимся."}
            {variant === "help" && "Заполните форму, и наши специалисты свяжутся с вами для обсуждения вашей ситуации."}
            {variant === "volunteer" && "Присоединяйтесь к нашей команде! Заполните форму, и мы пригласим вас на знакомство."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {variant === "donate" && (
            <>
              <div className="space-y-3">
                <Label>Сумма пожертвования</Label>
                <div className="grid grid-cols-4 gap-2">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount.value);
                        setCustomAmount("");
                      }}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                        selectedAmount === amount.value && !customAmount
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Другая сумма"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                    }}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                </div>
              </div>
              <div>
                <Label htmlFor="donor-name">Ваше имя</Label>
                <Input
                  id="donor-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="donor-email">Email</Label>
                <Input
                  id="donor-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Для отправки чека"
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={!name || !email || isSubmitting}
                className="w-full bg-gradient-to-r from-[#E62129] to-[#F15A29] hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  `Пожертвовать ${(customAmount ? parseInt(customAmount) : selectedAmount).toLocaleString()} ₽`
                )}
              </Button>
            </>
          )}

          {variant === "help" && (
            <>
              <div>
                <Label htmlFor="help-name">Ваше имя *</Label>
                <Input
                  id="help-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="help-phone">Телефон *</Label>
                <Input
                  id="help-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="help-situation">Опишите вашу ситуацию *</Label>
                <Textarea
                  id="help-situation"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Расскажите, чем мы можем вам помочь..."
                  className="mt-1 min-h-[100px]"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={!name || !phone || !situation || isSubmitting}
                className="w-full bg-gradient-to-r from-[#3A5FCD] to-[#5A7FDD] hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </Button>
            </>
          )}

          {variant === "volunteer" && (
            <>
              <div>
                <Label htmlFor="volunteer-name">Ваше имя *</Label>
                <Input
                  id="volunteer-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="mt-1"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="volunteer-phone">Телефон *</Label>
                  <Input
                    id="volunteer-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="volunteer-email">Email *</Label>
                  <Input
                    id="volunteer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Как вы хотите помочь?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {volunteerAreas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleArea(area.id)}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                        selectedAreas.includes(area.id)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="volunteer-message">О себе (необязательно)</Label>
                <Textarea
                  id="volunteer-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Расскажите о себе, своём опыте или мотивации..."
                  className="mt-1 min-h-[80px]"
                />
              </div>
              <Button
                type="submit"
                disabled={!name || !phone || !email || isSubmitting}
                className="w-full bg-gradient-to-r from-[#7CDA28] to-[#5CB300] hover:opacity-90 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  "Стать волонтёром"
                )}
              </Button>
            </>
          )}
        </form>
      </>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        id={config.id}
        className="py-12 lg:py-16"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className={cn(
              "relative rounded-3xl overflow-hidden",
              isVisible ? "animate-scale-in" : "opacity-0"
            )}
          >
            {/* Gradient Background */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              config.gradient
            )} />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 pattern-hearts" />
            
            {/* Content */}
            <div className="relative p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Title */}
                <div className="text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
                    {config.title.split(" ").map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h2>
                </div>

                {/* Right Side - Content */}
                <div className="text-white/90">
                  <p className="text-lg leading-relaxed mb-6">
                    {config.description}
                  </p>
                  
                  <button
                    onClick={() => setModalOpen(true)}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "px-8 py-4 rounded-full",
                      "bg-gradient-to-r",
                      config.buttonGradient,
                      config.buttonTextColor,
                      "font-semibold",
                      "hover:shadow-xl hover:scale-105",
                      "transition-all duration-300 cursor-pointer"
                    )}
                  >
                    {config.buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Dialog open={modalOpen} onOpenChange={(open) => {
        setModalOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-md">
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Combined CTA sections component
export function CTASections() {
  return (
    <div className="space-y-4">
      <CTASection variant="donate" />
      <CTASection variant="help" />
      <CTASection variant="volunteer" />
    </div>
  );
}

export default CTASection;
