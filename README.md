# Split Ease

A modern expense splitting application built with Nuxt 3, Supabase, and Prisma.

## Tech Stack

- **Frontend**: Nuxt 4, Vue 3, Tailwind CSS 4, DaisyUI
- **Backend**: Nuxt Server API, Supabase Auth
- **Database**: PostgreSQL (Supabase), Prisma ORM
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Linting**: ESLint with @antfu/eslint-config
- **Git Hooks**: Husky + lint-staged

## Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, yarn, or bun
- PostgreSQL database (via Supabase)
- Supabase account

## Environment Setup

Create a `.env` file in the root directory with the following required variables:

```env
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
DATABASE_NAME=your_database_name
DATABASE_PASSWORD=your_database_password
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important**: All environment variables are validated using Zod and must:

- Be non-empty strings (`.min(1)` validation applied)
- Be present in your `.env` file
- Have valid values (empty strings like `SUPABASE_URL=""` will fail validation)

The validation is handled by [lib/env.ts](lib/env.ts) and [lib/try-parse-env.ts](lib/try-parse-env.ts).

## Installation

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Database Setup

This project uses Prisma as the ORM to interact with your Supabase PostgreSQL database.

### Initialize Prisma

1. Generate Prisma Client:

```bash
npm run prismagenerate
# or
npx prisma generate
```

2. Run database migrations:

```bash
npx prisma migrate dev
```

3. (Optional) Open Prisma Studio to view your database:

```bash
npx prisma studio
```

### Database Architecture

The application uses a **dual-database approach**:

1. **Supabase Auth System** (`auth.users` table)
   - Manages authentication (login/signup)
   - Stores encrypted passwords
   - Handles JWT tokens and sessions
   - Internal table managed by Supabase (not directly accessible)

2. **Application Database** (via Prisma)
   - Your custom tables: `users`, `expenses`, `groups`, etc.
   - Managed by Prisma ORM
   - User profiles link to Supabase Auth via shared UUID

**User Signup Flow**:

1. Create auth user via `supabase.auth.signUp()` (stores in `auth.users`)
2. Create user profile via `prisma.user.create()` (stores in `public.users`)
3. Both records share the same UUID for synchronization

See [server/api/signup.post.ts](server/api/signup.post.ts) for implementation.

## Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The server will be accessible on your local network (runs with `--host` flag).

## Testing Supabase Connection

Test if your Supabase connection is working:

```
GET http://localhost:3000/api/test-supabase
```

This endpoint will:

- Connect to Supabase using the service role key
- List all users in the auth system
- Return success status and user count

See [server/api/test-supabase.get.ts](server/api/test-supabase.get.ts) for details.

## Code Quality

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint:fix
```

### Git Hooks

This project uses Husky and lint-staged to automatically lint files before committing:

- Pre-commit: Runs `npm run lint` on staged files
- Ensures code quality standards are maintained

## API Endpoints

### Authentication

- `POST /api/signup` - User registration
  - Creates Supabase auth user
  - Creates user profile in database
  - Request body: `{ email, password, name? }`

### Testing

- `GET /api/test-supabase` - Test Supabase connection
  - Lists all users from Supabase Auth
  - Returns connection status

## Project Structure

```
split-ease-project/
├── app/
│   └── composables/
│       └── useSupabaseClient.ts    # Client-side Supabase client
├── server/
│   ├── api/
│   │   ├── signup.post.ts         # User registration endpoint
│   │   └── test-supabase.get.ts   # Connection test endpoint
│   └── utils/
│       └── prisma.ts              # Prisma client singleton
├── lib/
│   ├── env.ts                     # Environment variable schema & validation
│   └── try-parse-env.ts           # Zod validation helper
├── prisma/
│   └── schema.prisma              # Database schema
├── utils/
│   └── supabase.ts                # Server-side Supabase client
└── .env                           # Environment variables (not in git)
```

## Key Features

- **Type-safe environment variables** with Zod validation
- **Dual authentication system** (Supabase Auth + Prisma database)
- **Server-side API routes** for secure operations
- **Prisma ORM** for type-safe database queries
- **Modern Nuxt 4** with Vue 3 Composition API
- **Tailwind CSS 4** with DaisyUI components

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Troubleshooting

### Prisma Type Errors

If you encounter TypeScript errors after modifying the Prisma schema:

1. Stop your dev server
2. Regenerate the Prisma client: `npm run prismagenerate`
3. Restart your TypeScript server in VSCode: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
4. Restart your dev server

### Environment Variable Errors

If you see "Missing required values in .env" errors:

- Ensure all required variables are present in your `.env` file
- Check that no variables have empty string values
- The validation requires non-empty strings for all variables

### Import Path Errors in Server Code

Server-side code (in `server/` directory) should use relative imports:

- ✅ Correct: `import { prisma } from '../utils/prisma'`
- ❌ Incorrect: `import { prisma } from '~/server/utils/prisma'`

## Documentation

- [Nuxt Documentation](https://nuxt.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)

## License

Private project - all rights reserved.
