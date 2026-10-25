-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "imagePosition" TEXT NOT NULL DEFAULT '50% 50%',
    "script" JSONB NOT NULL DEFAULT '{}',
    "title" JSONB NOT NULL DEFAULT '{}',
    "temp" TEXT NOT NULL DEFAULT '',
    "text" JSONB NOT NULL DEFAULT '{}',
    "cta" JSONB NOT NULL DEFAULT '{}',
    "alt" JSONB NOT NULL DEFAULT '{}',
    "link" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

INSERT INTO "HeroSlide" ("id", "sortOrder", "image", "imagePosition", "script", "title", "temp", "text", "cta", "alt", "link", "updatedAt") VALUES
    ('hero-lake', 0, '/hero/lake.jpg', '40% 50%', '{"en": "Welcome to Zentee", "de": "Willkommen bei Zentee"}', '{"en": "A place to slow down", "de": "Ein Ort, um langsamer zu werden"}', '', '{"en": "Chinese tea and tea ware from small growers and makers.", "de": "Chinesischer Tee und Teegeschirr von kleinen Anbauern und Handwerkern."}', '{"en": "Explore tea", "de": "Tee entdecken"}', '{"en": "Tea ceremony by the lake", "de": "Teezeremonie am See"}', '/tea', CURRENT_TIMESTAMP),
    ('hero-green', 1, '/hero/green.jpg', '55% 50%', '{"en": "delicate & fresh", "de": "zart & frisch"}', '{"en": "Green tea", "de": "Grüner Tee"}', '70–80 °C', '{"en": "Boiling water makes it bitter. Let the water cool for a moment.", "de": "Kochendes Wasser macht ihn bitter. Lassen Sie das Wasser kurz abkühlen."}', '{"en": "See the tea", "de": "Zum Tee"}', '{"en": "Green tea in a gaiwan", "de": "Grüner Tee in der Gaiwan"}', '/tea', CURRENT_TIMESTAMP),
    ('hero-gaiwan', 2, '/hero/gaiwan.jpg', '50% 50%', '{"en": "three things in one", "de": "drei Dinge in einem"}', '{"en": "Gaiwan 盖碗", "de": "Gaiwan 盖碗"}', '', '{"en": "Teapot and tea bowl at once.", "de": "Teekanne und Teeschale zugleich."}', '{"en": "See the tea ware", "de": "Zum Teegeschirr"}', '{"en": "Blue and white porcelain gaiwan", "de": "Gaiwan aus blau-weißem Porzellan"}', '/teaware', CURRENT_TIMESTAMP),
    ('hero-puerh', 3, '/hero/puerh.jpg', '60% 50%', '{"en": "deep & bold", "de": "tief & kräftig"}', '{"en": "Pu-erh", "de": "Pu-Erh"}', '95–100 °C', '{"en": "It loves hot water. That is how its full depth comes out.", "de": "Er liebt heißes Wasser, so entfaltet sich seine ganze Tiefe."}', '{"en": "See the tea", "de": "Zum Tee"}', '{"en": "Pu-erh in a tea bowl", "de": "Pu-Erh in der Teeschale"}', '/tea', CURRENT_TIMESTAMP),
    ('hero-longjing', 4, '/hero/longjing.jpg', '45% 50%', '{"en": "spring in a cup", "de": "Tee, in dem der Frühling steckt"}', '{"en": "Long Jing 龙井", "de": "Long Jing 龙井"}', '', '{"en": "A green tea with flat, delicate leaves.", "de": "Ein grüner Tee mit flachen, zarten Blättern."}', '{"en": "See the tea", "de": "Zum Tee"}', '{"en": "Long Jing in a gaiwan", "de": "Long Jing in der Gaiwan"}', '/tea', CURRENT_TIMESTAMP);
