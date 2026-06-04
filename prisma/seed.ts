// ═══════════════════════════════════════════════════════════════
// GUDENKO FUND — Seed Data
// Initial data for categories, products, stories, pillars
// ═══════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIES
  // ═══════════════════════════════════════════════════════════════
  console.log('📦 Creating categories...');
  
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'bears' },
      update: {},
      create: {
        name: 'Медведи',
        slug: 'bears',
        description: 'Классические плюшевые мишки ручной работы. Мягкие, тёплые и невероятно обаятельные.',
        icon: '🧸',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'rabbits' },
      update: {},
      create: {
        name: 'Зайцы',
        slug: 'rabbits',
        description: 'Пушистые зайчики разных размеров. Идеальный подарок для детей и взрослых.',
        icon: '🐰',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dolls' },
      update: {},
      create: {
        name: 'Куклы',
        slug: 'dolls',
        description: 'Текстильные куклы ручной работы с уникальным характером и историей.',
        icon: '🎀',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'educational' },
      update: {},
      create: {
        name: 'Развивающие',
        slug: 'educational',
        description: 'Игрушки для развития мелкой моторики, воображения и творческих способностей.',
        icon: '🎨',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gift-sets' },
      update: {},
      create: {
        name: 'Подарочные наборы',
        slug: 'gift-sets',
        description: 'Готовые комплекты для особых случаев. Упакованы в фирменную коробку.',
        icon: '🎁',
        sortOrder: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTS
  // ═══════════════════════════════════════════════════════════════
  console.log('🧸 Creating products...');

  const bearsCategory = categories.find(c => c.slug === 'bears')!;
  const rabbitsCategory = categories.find(c => c.slug === 'rabbits')!;
  const dollsCategory = categories.find(c => c.slug === 'dolls')!;
  const educationalCategory = categories.find(c => c.slug === 'educational')!;
  const giftSetsCategory = categories.find(c => c.slug === 'gift-sets')!;

  const products = await Promise.all([
    // Медведи
    prisma.product.upsert({
      where: { slug: 'mishka-tepa' },
      update: {},
      create: {
        name: 'Мишка Тёпа',
        slug: 'mishka-tepa',
        description: 'Большой плюшевый медведь ручной работы из премиального хлопка. Мягкий, уютный и невероятно обаятельный. Наполнитель — гипоаллергенный синтепух. Можно стирать в машинке при 30°C.',
        shortDesc: 'Большой плюшевый мишка из премиального хлопка',
        price: 250000, // 2,500 ₽
        comparePrice: 300000,
        mainImage: '/images/products/bear-tepa.jpg',
        images: JSON.stringify(['/images/products/bear-tepa.jpg', '/images/products/bear-tepa-2.jpg']),
        categoryId: bearsCategory.id,
        inStock: 5,
        sku: 'GF-BEAR-001',
        height: 35,
        weight: 450,
        material: 'Премиальный хлопок',
        filler: 'Гипоаллергенный синтепух',
        rating: 4.9,
        reviewsCount: 12,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'mishka-mikhail' },
      update: {},
      create: {
        name: 'Мишка Михаил',
        slug: 'mishka-mikhail',
        description: 'Классический бурый медведь с добрыми глазами. Сшит из мохера премиум-класса, нос вышит вручную. Идеальный компаньон для ребёнка.',
        shortDesc: 'Классический бурый мишка из мохера',
        price: 380000,
        mainImage: '/images/products/bear-mikhail.jpg',
        images: JSON.stringify(['/images/products/bear-mikhail.jpg']),
        categoryId: bearsCategory.id,
        inStock: 3,
        sku: 'GF-BEAR-002',
        height: 40,
        weight: 520,
        material: 'Мохер премиум',
        filler: 'Синтепух',
        rating: 5.0,
        reviewsCount: 8,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'medvezhonok-umka' },
      update: {},
      create: {
        name: 'Медвежонок Умка',
        slug: 'medvezhonok-umka',
        description: 'Маленький белый медвежонок — символ чистоты и доброты. Мягкий и уютный, помещается в детской ладошке.',
        shortDesc: 'Маленький белый медвежонок',
        price: 150000,
        mainImage: '/images/products/bear-umka.jpg',
        images: JSON.stringify(['/images/products/bear-umka.jpg']),
        categoryId: bearsCategory.id,
        inStock: 12,
        sku: 'GF-BEAR-003',
        height: 20,
        weight: 180,
        material: 'Хлопок',
        filler: 'Синтепух',
        rating: 4.8,
        reviewsCount: 23,
        isNew: true,
      },
    }),

    // Зайцы
    prisma.product.upsert({
      where: { slug: 'zaika-pushok' },
      update: {},
      create: {
        name: 'Зайка Пушок',
        slug: 'zaika-pushok',
        description: 'Невероятно мягкий зайчик из велюра. Длинные ушки удобно держать в руках. Подходит для самых маленьких — с 6 месяцев.',
        shortDesc: 'Мягкий велюровый зайчик',
        price: 180000,
        mainImage: '/images/products/rabbit-pushok.jpg',
        images: JSON.stringify(['/images/products/rabbit-pushok.jpg']),
        categoryId: rabbitsCategory.id,
        inStock: 8,
        sku: 'GF-RABBIT-001',
        height: 28,
        weight: 200,
        material: 'Велюр',
        filler: 'Синтепух',
        rating: 4.9,
        reviewsCount: 15,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'zaika-snezhok' },
      update: {},
      create: {
        name: 'Зайка Снежок',
        slug: 'zaika-snezhok',
        description: 'Белоснежный зайчик с розовыми ушками. Отличный подарок на новоселье или крещение.',
        shortDesc: 'Белоснежный зайчик с розовыми ушками',
        price: 220000,
        mainImage: '/images/products/rabbit-snezhok.jpg',
        images: JSON.stringify(['/images/products/rabbit-snezhok.jpg']),
        categoryId: rabbitsCategory.id,
        inStock: 6,
        sku: 'GF-RABBIT-002',
        height: 32,
        weight: 240,
        material: 'Хлопок',
        filler: 'Синтепух',
        rating: 4.7,
        reviewsCount: 9,
      },
    }),

    // Куклы
    prisma.product.upsert({
      where: { slug: 'kukla-masha' },
      update: {},
      create: {
        name: 'Кукла Маша',
        slug: 'kukla-masha',
        description: 'Текстильная кукла с русой косой и вышитым лицом. Платье можно снимать и менять. Каждая кукла — уникальна.',
        shortDesc: 'Текстильная кукла с русой косой',
        price: 320000,
        mainImage: '/images/products/doll-masha.jpg',
        images: JSON.stringify(['/images/products/doll-masha.jpg']),
        categoryId: dollsCategory.id,
        inStock: 4,
        sku: 'GF-DOLL-001',
        height: 35,
        weight: 300,
        material: 'Хлопок, трикотаж',
        filler: 'Синтепух',
        rating: 5.0,
        reviewsCount: 7,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'kukla-dasha' },
      update: {},
      create: {
        name: 'Кукла Даша',
        slug: 'kukla-dasha',
        description: 'Кукла-подружка с рыжими косичками и веснушками. Сшита из натуральных тканей, одежда съёмная.',
        shortDesc: 'Кукла с рыжими косичками',
        price: 350000,
        mainImage: '/images/products/doll-dasha.jpg',
        images: JSON.stringify(['/images/products/doll-dasha.jpg']),
        categoryId: dollsCategory.id,
        inStock: 3,
        sku: 'GF-DOLL-002',
        height: 38,
        weight: 320,
        material: 'Хлопок, лён',
        filler: 'Синтепух',
        rating: 4.8,
        reviewsCount: 5,
        isNew: true,
      },
    }),

    // Развивающие
    prisma.product.upsert({
      where: { slug: 'taktlniy-kubik' },
      update: {},
      create: {
        name: 'Тактильный кубик',
        slug: 'taktlniy-kubik',
        description: 'Развивающий куб с 6 разными текстурами: гладкий, шершавый, мягкий, шуршащий, вязаный и тканевый. Развивает мелкую моторику.',
        shortDesc: 'Развивающий куб с разными текстурами',
        price: 120000,
        mainImage: '/images/products/cube-tactile.jpg',
        images: JSON.stringify(['/images/products/cube-tactile.jpg']),
        categoryId: educationalCategory.id,
        inStock: 15,
        sku: 'GF-EDU-001',
        height: 12,
        weight: 150,
        material: 'Хлопок, велюр, флис',
        filler: 'Синтепух',
        rating: 4.9,
        reviewsCount: 31,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'girlyanda-shnurovka' },
      update: {},
      create: {
        name: 'Гирлянда-шнуровка',
        slug: 'girlyanda-shnurovka',
        description: 'Деревянные бусины и текстильные элементы, которые нужно нанизывать на шнурок. Развивает усидчивость и координацию.',
        shortDesc: 'Развивающая шнуровка с бусинами',
        price: 95000,
        mainImage: '/images/products/lacing.jpg',
        images: JSON.stringify(['/images/products/lacing.jpg']),
        categoryId: educationalCategory.id,
        inStock: 20,
        sku: 'GF-EDU-002',
        height: 5,
        weight: 100,
        material: 'Дерево, хлопок',
        filler: null,
        rating: 4.7,
        reviewsCount: 18,
        isNew: true,
      },
    }),

    // Подарочные наборы
    prisma.product.upsert({
      where: { slug: 'podarok-novorozhdennomu' },
      update: {},
      create: {
        name: 'Подарок новорождённому',
        slug: 'podarok-novorozhdennomu',
        description: 'Набор для новорождённого: мягкий зайка, тактильный платочек и прорезыватель из натурального дерева. Упаковано в фирменную коробку.',
        shortDesc: 'Набор для новорождённого в фирменной упаковке',
        price: 450000,
        mainImage: '/images/products/gift-newborn.jpg',
        images: JSON.stringify(['/images/products/gift-newborn.jpg']),
        categoryId: giftSetsCategory.id,
        inStock: 6,
        sku: 'GF-GIFT-001',
        height: 25,
        weight: 400,
        material: 'Хлопок, дерево',
        filler: 'Синтепух',
        rating: 5.0,
        reviewsCount: 14,
        isFeatured: true,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // ═══════════════════════════════════════════════════════════════
  // PILLARS (Направления работы фонда)
  // ═══════════════════════════════════════════════════════════════
  console.log('🎯 Creating pillars...');

  const pillars = await Promise.all([
    prisma.pillar.upsert({
      where: { slug: 'education' },
      update: {},
      create: {
        title: 'Образование',
        slug: 'education',
        description: 'Поддержка талантливых студентов и исследователей. Стипендии, гранты и образовательные программы для тех, кто хочет менять мир к лучшему.',
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
        description: 'Помощь семьям в трудных жизненных ситуациях. Адресная поддержка, продуктовая помощь, решение бытовых проблем.',
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
        description: 'Сохранение культурного наследия и поддержка искусства. Музеи, театры, выставки и образовательные проекты.',
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
        description: 'Защита окружающей среды и развитие экологического сознания. Посадка деревьев, очистка территорий, экологическое просвещение.',
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
        label: 'Игрушек создано',
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
    prisma.impactStat.upsert({
      where: { id: 'stat-years' },
      update: {},
      create: {
        id: 'stat-years',
        label: 'Лет работы',
        value: 12,
        suffix: '+',
        icon: '📅',
        sortOrder: 4,
      },
    }),
    prisma.impactStat.upsert({
      where: { id: 'stat-projects' },
      update: {},
      create: {
        id: 'stat-projects',
        label: 'Активных проектов',
        value: 15,
        icon: '🎯',
        sortOrder: 5,
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
      where: { slug: 'masha-story' },
      update: {},
      create: {
        title: 'Когда Маша вернулась к жизни',
        slug: 'masha-story',
        excerpt: 'История о том, как поддержка фонда помогла 7-летней Маше справиться с тяжёлой болезнью и вернуться к нормальной жизни.',
        content: `Маше было 7 лет, когда ей поставили диагноз, который перевернул жизнь всей семьи. Родители не знали, где искать помощь — дорогостоящее лечение было не по карману.

В фонд Гуденко они обратились по рекомендации знакомых. За 48 часов мы собрали средства на первый этап лечения. Дальше — реабилитация, поддержка психолога, помощь родителям с работой.

Сегодня Маша ходит в обычную школу, рисует картины и мечтает стать врачом. "Я хочу помогать людям так же, как помогли мне", — говорит она.

Эта история — одна из сотен. За каждой цифрой в нашей статистике стоит живой человек со своей судьбой.`,
        image: '/images/stories/masha.jpg',
        personName: 'Маша К.',
        personAge: 7,
        location: 'Москва',
        category: 'Медицина',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-01-15'),
      },
    }),
    prisma.story.upsert({
      where: { slug: 'ivan-story' },
      update: {},
      create: {
        title: 'Иван: от интерната до университета',
        slug: 'ivan-story',
        excerpt: 'Как образовательная программа фонда помогла талантливому подростку из детского дома поступить в престижный вуз.',
        content: `Ваня вырос в детском доме. В 15 лет он увлёкся программированием, но у него не было компьютера и доступа к интернету. Социальные педагоги связались с фондом.

Мы обеспечили Ваню всем необходимым: ноутбук, интернет, курсы программирования. Но главное — ментор. Программист из нашей команды стал для Вани наставником.

Через два года Ваня занял первое место на региональной олимпиаде по информатике. Сейчас он студент первого курса одного из лучших технических вузов страны.

"Фонд дал мне не только ресурсы, но и веру в себя", — говорит Иван.`,
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
    prisma.story.upsert({
      where: { slug: 'family-petrov' },
      update: {},
      create: {
        title: 'Семья Петровых: новый дом',
        slug: 'family-petrov',
        excerpt: 'История о том, как семья с тремя детьми после пожара получила помощь и начала новую жизнь.',
        content: `Пожар уничтожил всё: дом, вещи, документы. Семья Петровых с тремя детьми осталась на улице посреди зимы. Соседи приютили, но это было временное решение.

Фонд подключился в течение суток. Сначала — временное жильё, одежда, продукты. Затем — помощь с документами и сбор средств на восстановление дома.

Через восемь месяцев семья въехала в новый дом. "Мы не просто получили крышу над головой, — говорит мама. — Мы обрели людей, которые реально помогают".`,
        image: '/images/stories/petrov-family.jpg',
        personName: 'Семья Петровых',
        location: 'Тверская область',
        category: 'Социальная поддержка',
        isPublished: true,
        publishedAt: new Date('2024-03-10'),
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
