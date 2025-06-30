# 🧪 Project Starter – PSSN Stack

A modern and production-ready starter template using the **PSSN** stack:

- **P**risma – Type-safe ORM
- **S**upabase – Auth, DB, and Storage
- **S**hadcn/UI – Accessible, beautiful UI components
- **N**ext.js – App Router (15+)

Built with developer experience, flexibility, and performance in mind.

---

## ✨ Features

- 🔐 **Authentication** with Supabase (email/password)
- 👤 **User profiles** created on registration
- 🔄 **Protected routes** (server and client-side)
- 🎨 **Theming** (dark/light mode toggle)
- 🧱 **Responsive layouts** (public, auth, private dashboard)
- ⚡ **Pre-configured** ESLint, Prettier, Tailwind, env, and toast
- 🚀 **Extendable** and clean file structure

---

## 📦 Tech Stack

- Next.js
- Prisma
- Supabase
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- Sonner (toast notifications)

---

## 🚀 Getting Started

### 1. Clone the repo

```git
git clone https://github.com/iramm21/project-starter.git
cd project-starter
```

### 2. Install dependencies

```pnpm
pnpm install
```

or

```npm
npm install
```

or

```yarn
yarn
```

### 3. Set up environment variables

Create a `.env` file based on `.env.example`:

```.env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-database-connection-string
```

> You can find these in your Supabase project dashboard.

---

### 4. Set up the database

Make sure `DATABASE_URL` is set in `.env` and run:

```npx
npx prisma migrate dev --name init
```

This sets up the initial schema and seeds (if added).

---

### 5. Run the dev server

```npm
npm run dev
```

or

```pnpm
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to start building.

---

## 🛠 Project Structure

```md
.
├── app/ # Next.js App Router pages/layouts
├── components/ # UI components (shadcn, custom)
├── features/ # Feature-based components and logic
├── lib/ # Supabase and Prisma clients
├── styles/ # Global CSS
├── prisma/ # Prisma schema and migrations
├── public/ # Static assets (e.g. images)
└── utils/ # Reusable utilities
```

---

## 📄 Scripts

- `dev` – run in development
- `build` – build the app for production
- `lint` – run ESLint
- `format` – run Prettier

---

## 🧩 Auth Flow

- User signs up or logs in
- Supabase session is stored client-side
- `UserProfile` is auto-created via server function
- Client and server components reactively check auth

---

## 🧪 Testing Ideas (WIP)

Coming soon: testing setup (e.g. Playwright or Vitest + Testing Library)

---

## 🧼 TODO

- [ ] Add unit/integration testing
- [ ] Add Stripe billing
- [ ] Add admin dashboard (with role-based RLS)
- [ ] Add file uploads with Supabase Storage

---

## 📬 Feedback / Issues

Feel free to open an issue or submit a PR to improve this starter!

---

## 🛡 License

MIT
