// ═══════════════════════════════════════════════════════════════
// GUDENKO FUND — Seed Data
// Gudiki toys from brandbook
// ═══════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Gudiki database...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('✅ Data cleaned');

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIES - Gudiki types
  // ═══════════════════════════════════════════════════════════════
  console.log('📦 Creating categories...');
  
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'gudiki-basic' },
      update: {},
      create: {
        name: 'Гудики',
        slug: 'gudiki-basic',
        description: 'Мягкие игрушки Гудики — каждый со своим уникальным характером и историей.',
        icon: '🧸',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'surprise-packs' },
      update: {},
      create: {
        name: 'Сюрприз-паки',
        slug: 'surprise-packs',
        description: 'Наборы Гудиков с сертификатами и подарками. Идеально для подарка.',
        icon: '🎁',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'limited' },
      update: {},
      create: {
        name: 'Лимитированные',
        slug: 'limited',
        description: 'Редкие и секретные Гудики. Выпускаются ограниченными тиражами.',
        icon: '⭐',
        sortOrder: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTS - Gudiki toys
  // ═══════════════════════════════════════════════════════════════
  console.log('🧸 Creating Gudiki products...');

  const gudikiCategory = categories.find(c => c.slug === 'gudiki-basic')!;
  const surpriseCategory = categories.find(c => c.slug === 'surprise-packs')!;
  const limitedCategory = categories.find(c => c.slug === 'limited')!;

  const products = await Promise.all([
    // Листик - флагман экологии
    prisma.product.upsert({
      where: { slug: 'gudik-listik' },
      update: {},
      create: {
        name: 'Листик',
        slug: 'gudik-listik',
        description: `Энергичный и неутомимый Гудик, который хочет спасти мир прямо сейчас! Из макушки растёт маленький росток — он "всегда растёт".

Форма: Круглое тело с заострёнными ушками-листочками наверху.
Цвет: Салатовый + светло-зелёный.
Аксессуар: Маленький рюкзачок из коричневого фетра.
Характер: Энергичный, неутомимый, светлый. Хочет спасти мир СЕЙЧАС.

«Каждый может сделать мир лучше — достаточно начать с себя»`,
        shortDesc: 'Экологический Гудик с ростком на макушке',
        price: 100000, // 1,000 ₽
        mainImage: '/images/gudiki/listik.png',
        images: JSON.stringify(['/images/gudiki/listik.png']),
        categoryId: gudikiCategory.id,
        inStock: 20,
        sku: 'GUD-LISTIK-001',
        height: 15,
        weight: 150,
        material: 'Фетр зелёный 2мм, фетр коричневый',
        filler: 'Холофайбер',
        rating: 4.9,
        reviewsCount: 28,
        isFeatured: true,
      },
    }),

    // Семьяш - ядро фонда
    prisma.product.upsert({
      where: { slug: 'gudik-semyash' },
      update: {},
      create: {
        name: 'Семьяш',
        slug: 'gudik-semyash',
        description: `Самый мудрый Гудик. Не говорит — показывает. Тихий, но всегда рядом. На груди — домик-кувалочка, символ дома.

Форма: Тёплое круглое тело с маленькими "руками-завитками".
Цвет: Тёплый бежевый + коричневый.
Странная деталь: На теле вышиты инициалы "Г" (Gudenko) — фамильный герб.
Аксессуар: Крошечный домик-кувалочка (символ дома).
Характер: Самый мудрый Гудик. Не говорит — показывает.

«Семья — это не кровные узы. Это люди, рядом с которыми ты становишься лучше»`,
        shortDesc: 'Мудрый Гудик — ядро фонда (редкий)',
        price: 100000,
        mainImage: '/images/gudiki/semyash.png',
        images: JSON.stringify(['/images/gudiki/semyash.png']),
        categoryId: limitedCategory.id,
        inStock: 5,
        sku: 'GUD-SEMYASH-001',
        height: 15,
        weight: 160,
        material: 'Фетр бежевый, фетр коричневый',
        filler: 'Холофайбер',
        rating: 5.0,
        reviewsCount: 12,
        isFeatured: true,
      },
    }),

    // Тихоня - секретный
    prisma.product.upsert({
      where: { slug: 'gudik-tikhonya' },
      update: {},
      create: {
        name: 'Тихоня',
        slug: 'gudik-tikhonya',
        description: `Единственный Гудик, который "спит". Глаза закрыты. Но иногда... кто-то видит, как он моргает. Легенда гласит, что он — самый старый Гудик, видевший рождение мира.

Форма: Как листик, но целиком тёмно-синий с вышитыми звёздами.
Цвет: Тёмно-синий (midnight) + серебряные звёзды.
Странная деталь: Глаза ЗАКРЫТЫ.
Аксессуар: Звёздочка-подвеска (можно повесить на рюкзак).
Характер: Никто не знает...

«Тихая доброта — самая сильная»`,
        shortDesc: 'Секретный Гудик со звёздами (1 из 20)',
        price: 150000,
        mainImage: '/images/gudiki/tikhonya.png',
        images: JSON.stringify(['/images/gudiki/tikhonya.png']),
        categoryId: limitedCategory.id,
        inStock: 3,
        sku: 'GUD-TIKHON-001',
        height: 15,
        weight: 140,
        material: 'Фетр тёмно-синий, нитки серебряные',
        filler: 'Холофайбер',
        rating: 5.0,
        reviewsCount: 7,
        isFeatured: true,
      },
    }),

    // Шармо
    prisma.product.upsert({
      where: { slug: 'gudik-sharmo' },
      update: {},
      create: {
        name: 'Шармо',
        slug: 'gudik-sharmo',
        description: `Обнимает всех. Не понимает, что такое "чужой". Сердце из двух полукруглых половин разного цвета — намёк на "разных, но вместе".

Форма: Сердце из двух полукруглых половин.
Цвет: Коралловый + персиковый.
Странная деталь: Две половины разного цвета и ткани.
Аксессуар: Маленький флажок с символом дружбы.
Характер: Обнимает всех. Не понимает, что такое "чужой".

«Сила — не в том, чтобы быть таким же. Сила — в том, чтобы быть рядом»`,
        shortDesc: 'Гудик-сердце для равных возможностей',
        price: 100000,
        mainImage: '/images/gudiki/sharmo.png',
        images: JSON.stringify(['/images/gudiki/sharmo.png']),
        categoryId: gudikiCategory.id,
        inStock: 15,
        sku: 'GUD-SHARMO-001',
        height: 14,
        weight: 130,
        material: 'Фетр коралловый, фетр персиковый',
        filler: 'Холофайбер',
        rating: 4.9,
        reviewsCount: 21,
        isFeatured: true,
      },
    }),

    // Плюшкин
    prisma.product.upsert({
      where: { slug: 'gudik-plyushkin' },
      update: {},
      create: {
        name: 'Плюшкин',
        slug: 'gudik-plyushkin',
        description: `Серьёзный для Гудика. Не шутит про здоровье. Но если кто-то плачет — просто обнимает. Каплевидное тело с круглой "шапочкой-крестом".

Форма: Каплевидное тело с круглой "шапочкой-крестом".
Цвет: Мятный + белый.
Странная деталь: Одна ручка — фетровый шприц-бульбулятор.
Аксессуар: Фетровая сумочка-аптечка (открывается, внутри — пластырь-сердечко).
Характер: Серьёзный для Гудика. Не шутит про здоровье.

«Забота о себе — это тоже доброе дело»`,
        shortDesc: 'Гудик-доктор со шприцом и аптечкой',
        price: 100000,
        mainImage: '/images/gudiki/plyushkin.png',
        images: JSON.stringify(['/images/gudiki/plyushkin.png']),
        categoryId: gudikiCategory.id,
        inStock: 12,
        sku: 'GUD-PLYUSH-001',
        height: 15,
        weight: 150,
        material: 'Фетр мятный, фетр белый',
        filler: 'Холофайбер',
        rating: 4.8,
        reviewsCount: 16,
        isFeatured: true,
      },
    }),

    // Книжка
    prisma.product.upsert({
      where: { slug: 'gudik-knizhka' },
      update: {},
      create: {
        name: 'Книжка',
        slug: 'gudik-knizhka',
        description: `Всегда читает, задаёт вопросы, "застревает" в книгах. Тело можно "перелистать" — слои разного цвета.

Форма: Квадратное тело из слоёв ткани-"страниц".
Цвет: Небесно-голубой + белый + жёлтый.
Странная деталь: Тело можно "перелистать" — слои разного цвета.
Аксессуар: Маленькие фетровые очки на пуговице.
Характер: Всегда читает, задаёт вопросы.

«Знание — это доброта, которой можно поделиться бесконечно»`,
        shortDesc: 'Гудик-книжка для образования',
        price: 100000,
        mainImage: '/images/gudiki/knizhka.png',
        images: JSON.stringify(['/images/gudiki/knizhka.png']),
        categoryId: gudikiCategory.id,
        inStock: 18,
        sku: 'GUD-KNIZH-001',
        height: 14,
        weight: 140,
        material: 'Фетр голубой, белый, жёлтый',
        filler: 'Холофайбер',
        rating: 4.9,
        reviewsCount: 19,
        isNew: true,
      },
    }),

    // Маляр
    prisma.product.upsert({
      where: { slug: 'gudik-malyar' },
      update: {},
      create: {
        name: 'Маляр',
        slug: 'gudik-malyar',
        description: `Видит красоту там, где другие не видят. Раскрашивает всё подряд. Округлое тело с одним длинным "ушком"-кистью.

Форма: Округлое тело с одним длинным "ушком"-кистью.
Цвет: Белый + разноцветные пятнышки-брызги.
Странная деталь: На теле — контрастное "пятно" цвета (светоотражающая нить).
Аксессуар: Фетровый берет + мини-палитра.
Характер: Видит красоту там, где другие не видят.

«Каждый человек — художник своей жизни»`,
        shortDesc: 'Гудик-художник с кисточкой',
        price: 100000,
        mainImage: '/images/gudiki/malyar.png',
        images: JSON.stringify(['/images/gudiki/malyar.png']),
        categoryId: gudikiCategory.id,
        inStock: 14,
        sku: 'GUD-MALYAR-001',
        height: 15,
        weight: 145,
        material: 'Фетр белый, разноцветный',
        filler: 'Холофайбер',
        rating: 4.8,
        reviewsCount: 14,
        isNew: true,
      },
    }),

    // ═══════════════════════════════════════════════════════════════
    // SURPRISE PACKS
    // ═══════════════════════════════════════════════════════════════

    // Бронза
    prisma.product.upsert({
      where: { slug: 'pack-bronze' },
      update: {},
      create: {
        name: 'Сюрприз-пак «Бронза»',
        slug: 'pack-bronze',
        description: `Начните коллекцию Гудиков! В наборе:
• 1 сюрприз-пак со случайным Гудиком
• Сертификат «Я создал Гудика»

Шанс выпадения редких Гудиков:
• Семьяш — 10%
• Тихоня — 5%`,
        shortDesc: '1 сюрприз-пак + сертификат',
        price: 50000, // 500 ₽
        mainImage: '/images/gudiki/pack-bronze.png',
        images: JSON.stringify(['/images/gudiki/pack-bronze.png']),
        categoryId: surpriseCategory.id,
        inStock: 100,
        sku: 'PACK-BRONZE',
        rating: 4.7,
        reviewsCount: 45,
      },
    }),

    // Серебро
    prisma.product.upsert({
      where: { slug: 'pack-silver' },
      update: {},
      create: {
        name: 'Сюрприз-пак «Серебро»',
        slug: 'pack-silver',
        description: `Выберите своего Гудика! В наборе:
• Выбор конкретного Гудика из базовой серии
• Сертификат «Я создал Гудика»
• Открытка с историей персонажа

Доступные Гудики: Листик, Шармо, Плюшкин, Книжка, Маляр`,
        shortDesc: 'Выбор Гудика + сертификат + открытка',
        price: 100000, // 1,000 ₽
        mainImage: '/images/gudiki/pack-silver.png',
        images: JSON.stringify(['/images/gudiki/pack-silver.png']),
        categoryId: surpriseCategory.id,
        inStock: 50,
        sku: 'PACK-SILVER',
        rating: 4.9,
        reviewsCount: 32,
        isFeatured: true,
      },
    }),

    // Золото
    prisma.product.upsert({
      where: { slug: 'pack-gold' },
      update: {},
      create: {
        name: 'Сюрприз-пак «Золото»',
        slug: 'pack-gold',
        description: `Большой Гудик для обнимашек! В наборе:
• Гудик 25 см (обнимашка) на выбор
• Сертификат «Я создал Гудика»
• История персонажа в красивой упаковке
• Значок фонда

Доступные Гудики: Листик, Шармо, Плюшкин`,
        shortDesc: 'Гудик 25 см + сертификат + значок',
        price: 250000, // 2,500 ₽
        mainImage: '/images/gudiki/pack-gold.png',
        images: JSON.stringify(['/images/gudiki/pack-gold.png']),
        categoryId: surpriseCategory.id,
        inStock: 25,
        sku: 'PACK-GOLD',
        rating: 5.0,
        reviewsCount: 18,
        isFeatured: true,
      },
    }),

    // Платина
    prisma.product.upsert({
      where: { slug: 'pack-platinum' },
      update: {},
      create: {
        name: 'Сюрприз-пак «Платина»',
        slug: 'pack-platinum',
        description: `Полная коллекция «Первые»! В наборе:
• Все 7 Гудиков серии «Первые»
• Книга сказок о Гудиках
• Благодарность на сайте фонда
• Подарочная упаковка

В набор входят: Листик, Шармо, Плюшкин, Книжка, Маляр, Семьяш, Тихоня`,
        shortDesc: 'Весь набор «Первые» (7 шт) + книга сказок',
        price: 1000000, // 10,000 ₽
        mainImage: '/images/gudiki/pack-platinum.png',
        images: JSON.stringify(['/images/gudiki/pack-platinum.png']),
        categoryId: surpriseCategory.id,
        inStock: 5,
        sku: 'PACK-PLATINUM',
        rating: 5.0,
        reviewsCount: 8,
      },
    }),

    // Меценат
    prisma.product.upsert({
      where: { slug: 'pack-maecenas' },
      update: {},
      create: {
        name: 'Сюрприз-пак «Меценат»',
        slug: 'pack-maecenas',
        description: `Станьте создателем нового Гудика! В наборе:
• Личный Гудик «на заказ» по вашему желанию
• Упоминание как создателя персонажа в брендбуке
• Полная коллекция Гудиков
• Встреча с командой фонда

После покупки мы свяжемся с вами для обсуждения деталей.`,
        shortDesc: 'Личный Гудик на заказ + упоминание как создателя',
        price: 2500000, // 25,000 ₽
        mainImage: '/images/gudiki/pack-maecenas.png',
        images: JSON.stringify(['/images/gudiki/pack-maecenas.png']),
        categoryId: surpriseCategory.id,
        inStock: 10,
        sku: 'PACK-MAECENAS',
        rating: 5.0,
        reviewsCount: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // ═══════════════════════════════════════════════════════════════
  // PILLARS
  // ═══════════════════════════════════════════════════════════════
  console.log('🎯 Creating pillars...');

  const pillars = await Promise.all([
    prisma.pillar.upsert({
      where: { slug: 'education' },
      update: {},
      create: {
        title: 'Образование',
        slug: 'education',
        description: 'Поддержка талантливых студентов и исследователей. Стипендии, гранты и образовательные программы.',
        icon: '📚',
        sortOrder: 1,
      },
    }),
    prisma.pillar.upsert({
      where: { slug: 'medicine' },
      update: {},
      create: {
        title: 'Медицина',
        slug: 'medicine',
        description: 'Доступ к качественному лечению для нуждающихся. Оплата операций, реабилитации и медицинских препаратов.',
        icon: '🏥',
        sortOrder: 2,
      },
    }),
    prisma.pillar.upsert({
      where: { slug: 'social' },
      update: {},
      create: {
        title: 'Социальная поддержка',
        slug: 'social',
        description: 'Помощь семьям в трудных жизненных ситуациях. Адресная поддержка, продуктовая помощь.',
        icon: '🤝',
        sortOrder: 3,
      },
    }),
    prisma.pillar.upsert({
      where: { slug: 'culture' },
      update: {},
      create: {
        title: 'Культура',
        slug: 'culture',
        description: 'Сохранение культурного наследия и поддержка искусства. Музеи, театры, выставки.',
        icon: '🎭',
        sortOrder: 4,
      },
    }),
    prisma.pillar.upsert({
      where: { slug: 'ecology' },
      update: {},
      create: {
        title: 'Экология',
        slug: 'ecology',
        description: 'Защита окружающей среды и развитие экологического сознания. Посадка деревьев, экологическое просвещение.',
        icon: '🌱',
        sortOrder: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${pillars.length} pillars`);

  // ═══════════════════════════════════════════════════════════════
  // IMPACT STATS
  // ═══════════════════════════════════════════════════════════════
  console.log('📊 Creating impact stats...');

  const stats = await Promise.all([
    prisma.impactStat.upsert({
      where: { id: 'stat-families' },
      update: {},
      create: {
        id: 'stat-families',
        label: 'Семей поддержано',
        value: 847,
        icon: '👨‍👩‍👧‍👦',
        sortOrder: 1,
      },
    }),
    prisma.impactStat.upsert({
      where: { id: 'stat-toys' },
      update: {},
      create: {
        id: 'stat-toys',
        label: 'Гудиков создано',
        value: 1250,
        suffix: '+',
        icon: '🧸',
        sortOrder: 2,
      },
    }),
    prisma.impactStat.upsert({
      where: { id: 'stat-money' },
      update: {},
      create: {
        id: 'stat-money',
        label: 'Направлено на помощь',
        value: 32,
        suffix: 'M ₽',
        icon: '💝',
        sortOrder: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${stats.length} impact stats`);

  // ═══════════════════════════════════════════════════════════════
  // STORIES
  // ═══════════════════════════════════════════════════════════════
  console.log('📖 Creating stories...');

  const stories = await Promise.all([
    prisma.story.upsert({
      where: { slug: 'ivan-story' },
      update: {},
      create: {
        title: 'Иван: от интерната до университета',
        slug: 'ivan-story',
        excerpt: 'Как образовательная программа фонда помогла талантливому подростку из детского дома поступить в престижный вуз.',
        content: `Ваня вырос в детском доме. В 15 лет он увлёкся программированием, но у него не было компьютера. Фонд обеспечил всем необходимым.

Через два года Ваня занял первое место на региональной олимпиаде. Сейчас он студент первого курса технического вуза.`,
        image: '/images/stories/ivan.jpg',
        personName: 'Иван С.',
        personAge: 17,
        location: 'Санкт-Петербург',
        category: 'Образование',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-02-20'),
      },
    }),
  ]);

  console.log(`✅ Created ${stories.length} stories`);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
