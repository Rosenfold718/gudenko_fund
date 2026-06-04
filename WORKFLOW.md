# 🌿 Git Branches Workflow

## Структура веток

```
main ──────► Продакшн (https://gudenkofund.vercel.app/)
  │
  └─ dev ──► Разработка и тестирование (Preview URL в Vercel)
       │
       ├─ feature/xxx ──► Новые функции
       ├─ fix/xxx ──────► Исправление багов
       └─ refactor/xxx ─► Рефакторинг кода
```

---

## 🚀 Как работает разработка

### 1. Начало работы над новой задачей
```bash
git checkout dev
git pull origin dev
git checkout -b feature/название-фичи
```

### 2. Разработка и коммиты
```bash
# Внесение изменений...
git add .
git commit -m "feat: описание изменений"
git push -u origin feature/название-фичи
```

### 3. Тестирование
- Vercel автоматически создаст Preview URL для ветки
- Тестируем на Preview URL

### 4. Слияние в dev
```bash
git checkout dev
git merge feature/название-фичи
git push origin dev
```

### 5. Проверка и релиз в продакшн
```bash
git checkout main
git merge dev
git push origin main
```
**→ После push в main изменения появятся на продакшене!**

---

## ⚠️ Правила безопасности

| Ветка | Деплой | Кто пушит |
|-------|--------|-----------|
| `main` | ✅ Production | Только после проверки |
| `dev` | ✅ Preview | Можно пушить свободно |
| `feature/*` | ✅ Preview | Свободно |

---

## 📋 Примеры названий веток

- `feature/shop-cart` — новая корзина
- `feature/dark-mode` — тёмная тема
- `fix/payment-error` — исправление оплаты
- `refactor/database` — рефакторинг БД

---

## 🔄 Откат изменений

### Если что-то сломалось на Production:
```bash
# Вариант 1: Откатить последний коммит
git checkout main
git revert HEAD
git push origin main

# Вариант 2: Откатиться к конкретной версии
git checkout main
git reset --hard v1.0.0
git push origin main --force
```

### Через Vercel Dashboard:
1. Откройте https://vercel.com/dashboard
2. Выберите проект
3. Deployments → выберите рабочую версию
4. Нажмите **"Promote to Production"**

---

## 📌 Текущие версии

| Версия | Дата | Описание |
|--------|------|----------|
| v1.0.0 | 2025-01-XX | Базовая версия с магазином Гудиков |

---

## 💡 Запомните

- `main` = **НЕ ТРОГАТЬ** без проверки!
- `dev` = **Безопасная зона** для экспериментов
- Всегда тестируйте на Preview URL перед merge в main
