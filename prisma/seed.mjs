import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD must be set (see .env) before seeding."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: { username: adminUsername, passwordHash },
  });

  const teas = [
    {
      slug: "silver-needle-white",
      teaType: "white",
      harvest: "Spring 2025",
      caffeineLevel: "low",
      accentColor: "#B8A588",
      featured: true,
      priceCents: 230,
      saleUnitGrams: 10,
      name: { en: "Silver Needle", de: "Silbernadel" },
      shortDescription: {
        en: "Downy white buds, picked before the leaf unfurls.",
        de: "Flaumige weiße Knospen, gepflückt bevor sich das Blatt entfaltet.",
      },
      description: {
        en: "A quiet tea. Only the unopened buds are picked, then gently sun-withered and dried — no rolling, no firing. What remains is close to the plant itself: faint honey, melon skin, and a coolness that lingers after swallowing.",
        de: "Ein stiller Tee. Nur die ungeöffneten Knospen werden gepflückt, sanft an der Sonne gewelkt und getrocknet — kein Rollen, kein Rösten.",
      },
      origin: { en: "Fuding, Fujian", de: "Fuding, Fujian" },
      flavorNotes: [
        { en: "Honey", de: "Honig" },
        { en: "Melon", de: "Melone" },
        { en: "Cool finish", de: "Kühler Abgang" },
      ],
      images: [],
    },
    {
      slug: "wuyi-rock-oolong",
      teaType: "oolong",
      harvest: "Spring 2025",
      caffeineLevel: "medium",
      accentColor: "#8C5A3C",
      featured: true,
      priceCents: 290,
      saleUnitGrams: 10,
      name: { en: "Wuyi Rock Oolong", de: "Wuyi-Felsen-Oolong" },
      shortDescription: {
        en: "Grown in mineral-rich cliffs, roasted slowly over charcoal.",
        de: "Gewachsen in mineralreichen Klippen, langsam über Holzkohle geröstet.",
      },
      description: {
        en: "The bushes grow directly in rock crevices, drawing minerals the tea carries for years afterward. Roasted in small batches over charcoal, it opens toasted and deep, then settles into something closer to dark honey and orchid.",
        de: "Die Sträucher wachsen direkt in Felsspalten. In kleinen Chargen über Holzkohle geröstet, öffnet er sich geröstet und tief.",
      },
      origin: { en: "Wuyi Mountains, Fujian", de: "Wuyi-Gebirge, Fujian" },
      flavorNotes: [
        { en: "Charcoal roast", de: "Holzkohleröstung" },
        { en: "Dark honey", de: "Dunkler Honig" },
        { en: "Orchid", de: "Orchidee" },
      ],
      images: [],
    },
    {
      slug: "aged-ripe-puerh",
      teaType: "puerh",
      harvest: "2018, aged",
      caffeineLevel: "medium",
      accentColor: "#1E1B16",
      featured: false,
      priceCents: 350,
      saleUnitGrams: 0, // продаётся целым блином
      name: { en: "Aged Ripe Pu-erh", de: "Gereifter Ripe Pu-erh" },
      shortDescription: {
        en: "Fermented and rested for years in a dry cellar.",
        de: "Fermentiert und über Jahre in einem trockenen Keller gereift.",
      },
      description: {
        en: "Pressed into a cake and left to change slowly, this pu-erh has softened with time into something earthy and calm — wet stone, aged wood, a sweetness that arrives late.",
        de: "Zu einem Fladen gepresst und langsam reifen gelassen, ist dieser Pu-erh mit der Zeit erdig und ruhig geworden.",
      },
      origin: { en: "Xishuangbanna, Yunnan", de: "Xishuangbanna, Yunnan" },
      flavorNotes: [
        { en: "Wet stone", de: "Nasser Stein" },
        { en: "Aged wood", de: "Altes Holz" },
        { en: "Late sweetness", de: "Späte Süße" },
      ],
      images: [],
    },
    {
      slug: "dragon-well-green",
      teaType: "green",
      harvest: "Spring 2025",
      caffeineLevel: "medium",
      accentColor: "#6B7A5E",
      featured: false,
      priceCents: 250,
      saleUnitGrams: 10,
      name: { en: "Dragon Well", de: "Drachenbrunnen" },
      shortDescription: {
        en: "Pan-fired by hand, flat-leafed and pale green.",
        de: "Von Hand in der Pfanne geröstet, flache Blätter, blassgrün.",
      },
      description: {
        en: "Pressed flat against a hot wok by hand, one batch at a time, this tea is chestnut-sweet and grassy, with almost no bitterness when brewed gently.",
        de: "Von Hand, Charge für Charge, flach in einem heißen Wok gepresst, ist dieser Tee kastaniensüß und grasig.",
      },
      origin: { en: "West Lake, Hangzhou", de: "Westsee, Hangzhou" },
      flavorNotes: [
        { en: "Chestnut", de: "Kastanie" },
        { en: "Grassy", de: "Grasig" },
        { en: "Gentle sweetness", de: "Sanfte Süße" },
      ],
      images: [],
    },
    {
      slug: "jin-jun-mei-red",
      teaType: "red",
      harvest: "Spring 2025",
      caffeineLevel: "medium",
      accentColor: "#A13D2E",
      featured: true,
      priceCents: 320,
      saleUnitGrams: 10,
      name: { en: "Jin Jun Mei", de: "Jin Jun Mei" },
      shortDescription: {
        en: "Golden-tipped black tea, sweet and smooth with no bitterness.",
        de: "Schwarzer Tee mit goldenen Spitzen, süß und mild, ohne Bitterkeit.",
      },
      description: {
        en: "Made only from the finest early buds, hand-withered and fully oxidized. The liquor runs amber-gold, carrying notes of dried longan, cocoa, and a faint smokiness that never overwhelms.",
        de: "Nur aus den feinsten frühen Knospen gefertigt, von Hand gewelkt und vollständig oxidiert. Der Aufguss ist bernsteingolden, mit Noten von getrockneter Longan und Kakao.",
      },
      origin: { en: "Tongmu, Wuyishan, Fujian", de: "Tongmu, Wuyishan, Fujian" },
      flavorNotes: [
        { en: "Dried longan", de: "Getrocknete Longan" },
        { en: "Cocoa", de: "Kakao" },
        { en: "Faint smoke", de: "Leichter Rauch" },
      ],
      images: [],
    },
    {
      slug: "white-peony",
      teaType: "white",
      harvest: "Spring 2025",
      caffeineLevel: "low",
      accentColor: "#C9BBA0",
      featured: false,
      priceCents: 210,
      saleUnitGrams: 10,
      name: { en: "White Peony", de: "Weiße Pfingstrose" },
      shortDescription: {
        en: "One bud, two leaves — bolder and fuller than Silver Needle.",
        de: "Eine Knospe, zwei Blätter — kräftiger und voller als Silbernadel.",
      },
      description: {
        en: "Picked slightly later than Silver Needle, with leaf included alongside the bud. Sun-withered the same way, but the result is fuller-bodied: hay, dried apricot, and a soft, lasting sweetness.",
        de: "Etwas später als Silbernadel gepflückt, mit Blatt neben der Knospe. Gleich an der Sonne gewelkt, aber voller im Geschmack: Heu, getrocknete Aprikose und sanfte Süße.",
      },
      origin: { en: "Fuding, Fujian", de: "Fuding, Fujian" },
      flavorNotes: [
        { en: "Hay", de: "Heu" },
        { en: "Dried apricot", de: "Getrocknete Aprikose" },
        { en: "Soft sweetness", de: "Sanfte Süße" },
      ],
      images: [],
    },
    {
      slug: "light-oolong-tieguanyin",
      teaType: "light oolong",
      harvest: "Autumn 2025",
      caffeineLevel: "medium",
      accentColor: "#9CAF88",
      featured: true,
      priceCents: 280,
      saleUnitGrams: 10,
      name: { en: "Light Tieguanyin", de: "Heller Tieguanyin" },
      shortDescription: {
        en: "Lightly oxidized, floral, and rolled into tight green pearls.",
        de: "Leicht oxidiert, blumig und zu dichten grünen Perlen gerollt.",
      },
      description: {
        en: "Barely oxidized and left unroasted, this oolong stays close to green tea in color but opens into orchid and fresh cream, with a bright, lingering sweetness on the finish.",
        de: "Kaum oxidiert und ungeröstet, bleibt dieser Oolong farblich nah am Grüntee, öffnet sich aber zu Orchidee und frischer Sahne.",
      },
      origin: { en: "Anxi, Fujian", de: "Anxi, Fujian" },
      flavorNotes: [
        { en: "Orchid", de: "Orchidee" },
        { en: "Fresh cream", de: "Frische Sahne" },
        { en: "Bright finish", de: "Heller Abgang" },
      ],
      images: [],
    },
    {
      slug: "raw-sheng-puerh",
      teaType: "puerh",
      harvest: "2022, young",
      caffeineLevel: "high",
      accentColor: "#5A5436",
      featured: false,
      priceCents: 380,
      saleUnitGrams: 0, // продаётся целым блином
      name: { en: "Young Raw Sheng Pu-erh", de: "Junger Roher Sheng Pu-erh" },
      shortDescription: {
        en: "Unfermented, sun-dried, and still sharpening with age.",
        de: "Unfermentiert, sonnengetrocknet und noch in der Reifung.",
      },
      description: {
        en: "Pressed young and left raw, this sheng is still finding its shape — bitter up front, giving way to a vegetal sweetness and a drying, mineral finish that will soften over the coming years.",
        de: "Jung gepresst und roh belassen, findet dieser Sheng noch seine Form — zunächst bitter, dann pflanzlich süß mit mineralischem Abgang.",
      },
      origin: { en: "Mengku, Yunnan", de: "Mengku, Yunnan" },
      flavorNotes: [
        { en: "Bitter edge", de: "Bittere Note" },
        { en: "Vegetal sweetness", de: "Pflanzliche Süße" },
        { en: "Mineral finish", de: "Mineralischer Abgang" },
      ],
      images: [],
    },
  ];

  for (const tea of teas) {
    await prisma.tea.upsert({
      where: { slug: tea.slug },
      update: tea,
      create: tea,
    });
  }

  const teawares = [
    {
      slug: "yixing-zisha-teapot",
      teaWareType: "teapot",
      accentColor: "#8C5A3C",
      featured: true,
      priceCents: 4900,
      pieceCount: 1,
      name: { en: "Yixing Zisha Teapot", de: "Yixing-Zisha-Teekanne" },
      shortDescription: {
        en: "Unglazed clay that absorbs and deepens the tea it holds.",
        de: "Unglasierter Ton, der den Tee, den er hält, aufnimmt und vertieft.",
      },
      description: {
        en: "Thrown and shaped entirely by hand, then fired unglazed so the clay itself breathes. Used consistently with one tea, a zisha pot slowly takes on its character.",
        de: "Vollständig von Hand gedreht und geformt, dann unglasiert gebrannt, damit der Ton selbst atmen kann.",
      },
      material: { en: "Zisha (purple clay)", de: "Zisha (violetter Ton)" },
      origin: { en: "Yixing, Jiangsu", de: "Yixing, Jiangsu" },
      craftsman: {
        en: "Made by a fourth-generation Yixing potter",
        de: "Gefertigt von einem Töpfer in vierter Generation aus Yixing",
      },
      capacityMl: 120,
      images: [],
    },
    {
      slug: "celadon-gaiwan",
      teaWareType: "gaiwan",
      accentColor: "#6B7A5E",
      featured: true,
      priceCents: 2900,
      pieceCount: 1,
      name: { en: "Celadon Gaiwan", de: "Seladon-Gaiwan" },
      shortDescription: {
        en: "A lidded bowl for brewing, in soft jade-toned glaze.",
        de: "Eine Schale mit Deckel zum Aufbrühen, in sanfter jadefarbener Glasur.",
      },
      description: {
        en: "The gaiwan is the most direct way to taste a tea — no filter, no absorption, just leaf and water and a few seconds of judgment.",
        de: "Der Gaiwan ist die direkteste Art, einen Tee zu schmecken — kein Filter, keine Aufnahme, nur Blatt und Wasser.",
      },
      material: { en: "Celadon porcelain", de: "Seladon-Porzellan" },
      origin: { en: "Longquan, Zhejiang", de: "Longquan, Zhejiang" },
      craftsman: null,
      capacityMl: 100,
      images: [],
    },
    {
      slug: "bamboo-tea-tray",
      teaWareType: "tray",
      accentColor: "#B8A588",
      featured: false,
      priceCents: 3900,
      pieceCount: 1,
      name: { en: "Bamboo Tea Tray", de: "Bambus-Teetablett" },
      shortDescription: {
        en: "A slatted tray that carries spilled water away, quietly.",
        de: "Ein Lattentablett, das verschüttetes Wasser unauffällig ableitet.",
      },
      description: {
        en: "Tea ceremony is generous with water. This tray sits beneath it all, its slats hiding a shallow reservoir, so the ritual can stay unhurried.",
        de: "Die Teezeremonie geht großzügig mit Wasser um. Dieses Tablett liegt darunter und verbirgt ein flaches Reservoir.",
      },
      material: { en: "Solid bamboo", de: "Massives Bambus" },
      origin: { en: "Anji, Zhejiang", de: "Anji, Zhejiang" },
      craftsman: null,
      capacityMl: null,
      images: [],
    },
    {
      slug: "chahai-fairness-pitcher",
      teaWareType: "pitcher",
      accentColor: "#8C5A3C",
      featured: true,
      priceCents: 1800,
      pieceCount: 1,
      name: { en: "Chahai (Fairness Pitcher)", de: "Chahai (Fairness-Kännchen)" },
      shortDescription: {
        en: "Pours the brewed tea off evenly before serving each cup.",
        de: "Gießt den aufgebrühten Tee gleichmäßig ab, bevor jede Tasse serviert wird.",
      },
      description: {
        en: "Tea steeped in a gaiwan or pot never comes out even — the first pour is weaker, the last stronger. The chahai catches the whole brew first, so every cup poured from it tastes the same.",
        de: "In einem Gaiwan oder einer Kanne gezogener Tee kommt nie gleichmäßig heraus. Der Chahai fängt den gesamten Aufguss zuerst auf, sodass jede daraus eingeschenkte Tasse gleich schmeckt.",
      },
      material: { en: "Borosilicate glass", de: "Borosilikatglas" },
      origin: { en: "Chaozhou, Guangdong", de: "Chaozhou, Guangdong" },
      craftsman: null,
      capacityMl: 150,
      images: [],
    },
    {
      slug: "porcelain-tea-cup",
      teaWareType: "cup",
      accentColor: "#EDE7DC",
      featured: false,
      priceCents: 1200,
      pieceCount: 1,
      name: { en: "Porcelain Tea Cup", de: "Porzellan-Teetasse" },
      shortDescription: {
        en: "A small cup for tasting, thin-walled and quick to cool.",
        de: "Eine kleine Tasse zum Verkosten, dünnwandig und schnell abkühlend.",
      },
      description: {
        en: "Gongfu cups are small on purpose — a few sips, judged while still warm, before the next pour arrives. Thin porcelain walls let the tea cool fast enough to taste clearly.",
        de: "Gongfu-Tassen sind absichtlich klein — ein paar Schlucke, noch warm beurteilt, bevor der nächste Aufguss kommt.",
      },
      material: { en: "White porcelain", de: "Weißes Porzellan" },
      origin: { en: "Dehua, Fujian", de: "Dehua, Fujian" },
      craftsman: null,
      capacityMl: 30,
      images: [],
    },
  ];

  for (const teaware of teawares) {
    await prisma.teaWare.upsert({
      where: { slug: teaware.slug },
      update: teaware,
      create: teaware,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
