# Zentee

Website and small online shop for Zentee : teas, teaware, a cart and checkout, plus an admin panel for products and orders. The site is in English and German.

Built with Next.js 14, Tailwind, next-intl, Prisma + PostgreSQL. Product images are stored in Cloudflare R2.

## Running locally

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

In `.env` you need the database URL, a `SESSION_SECRET` (32+ characters), the admin login and password, and the R2 keys if you want image uploads to work.

`db:seed` creates the admin account and a few sample products. The admin panel is at `/admin`.
