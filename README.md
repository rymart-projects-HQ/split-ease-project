# SplitEase

A modern expense splitting application for groups, roommates, and teams. Built with Nuxt 4.

## Tech Stack

- **Frontend:** Nuxt 4.2.2, Vue 3.5, TypeScript 5.9
- **Styling:** Tailwind CSS 4.1, DaisyUI 5.5
- **Database:** Prisma 6.19 with PostgreSQL
- **Icons:** @nuxt/icon with Material Symbols
- **Color Mode:** @nuxtjs/color-mode

## Project Structure

```
split-ease-project/
├── app/           # Frontend (pages, components, layouts)
├── prisma/        # Database schema and migrations
├── server/        # API routes and utilities
├── test/          # Test configuration
└── .github/       # CI/CD workflows
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set your database URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/splitease"
```

### 3. Setup database

```bash
npm run prismagenerate
npx prisma migrate deploy
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Script                   | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run preview`        | Preview production build |
| `npm run lint`           | Run ESLint               |
| `npm run lint:fix`       | Fix ESLint errors        |
| `npm run prismagenerate` | Generate Prisma client   |

## Documentation

- [App Directory](app/README.md) - Frontend structure
- [Prisma](prisma/README.md) - Database setup
- [Server](server/README.md) - API routes
