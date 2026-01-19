# Split Ease Project - Comprehensive Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Files Reference](#key-files-reference)
5. [Development Guide](#development-guide)
6. [Code Quality & Standards](#code-quality--standards)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Current State & Next Steps](#current-state--next-steps)

---

## Project Overview

**Split Ease** is an expense splitting/bill sharing web application built with modern web technologies. The project is currently in its **early development stage** - the infrastructure and development tooling are fully configured, but core application features are yet to be implemented.

### Project Purpose

Split Ease aims to simplify expense management and bill splitting among groups of people. While the exact feature set is still being defined, the project structure suggests functionality for:

- User authentication and management
- Expense tracking and splitting
- Group management
- Payment reconciliation

### Current Status

- **Complete**: Development infrastructure, linting, CI/CD, project scaffolding, database setup (Prisma + PostgreSQL), Tailwind CSS + DaisyUI integration, routing enabled
- **In Progress**: Core application development, UI components
- **Pending**: Feature implementation, authentication, full API development

---

## Technology Stack

### Frontend Framework

- **Nuxt 4.2.2** - Meta-framework for Vue.js with server-side rendering
  - File-based routing
  - Auto-imports for components and composables
  - Built-in TypeScript support
  - Server-side rendering (SSR) and static site generation (SSG)
- **Vue 3.5.26** - Progressive JavaScript framework
  - Composition API
  - Reactive data binding
  - Component-based architecture
- **Vue Router 4.6.4** - Official routing library

### Development & Build Tools

- **TypeScript 5.9.3** - Static type checking and enhanced IDE support
- **ESLint 9.39.2** - Code linting and quality enforcement
  - **@antfu/eslint-config 6.7.3** - Opinionated, comprehensive ESLint rules
  - **eslint-plugin-format 1.2.0** - Additional formatting rules
  - **@nuxt/eslint 1.12.1** - Nuxt-specific integrations
- **tsx 4.21.0** - TypeScript execution engine
- **dotenv 17.2.3** - Environment variable management

### Database & ORM

- **Prisma 6.19.2** - Modern TypeScript ORM
  - **@prisma/client 6.19.2** - Auto-generated type-safe database client
  - **PostgreSQL** - Database provider (configured via DATABASE_URL)
  - **pg 8.17.0** - PostgreSQL client for Node.js
  - **@types/pg 8.16.0** - TypeScript definitions for pg
- **Initial Schema**: User model with email, name, timestamps

### Code Quality Tools

- **Husky 9.1.7** - Git hooks manager for running pre-commit checks
- **lint-staged 16.2.7** - Run linters on staged files only

### Styling

- **Tailwind CSS 4.1.18** - Utility-first CSS framework
  - **@tailwindcss/vite 4.1.18** - Vite plugin integration
  - **DaisyUI 5.5.14** - Tailwind CSS component library
- **DM Sans** - Google Fonts typeface (variable font with weights 100-1000)
- Global CSS with Tailwind directives

---

## Project Structure

```
split-ease-project/
.claude/                          # Claude AI configuration
 settings.local.json           # Local permissions and settings
 split-ease-project.md         # This documentation file
.github/                          # GitHub configuration
 workflows/
     ci.yaml                   # CI pipeline for automated linting

.husky/                           # Git hooks configuration
_/                            # Husky internal files
pre-commit                    # Pre-commit hook (runs lint-staged)

.nuxt/                            # Nuxt build artifacts (auto-generated)
tsconfig.*.json               # TypeScript configs for app/server/node
...                           # Build cache and generated files
.vscode/                          # VS Code workspace settings
settings.json                 # ESLint & editor integration
extension.json                # Recommended VS Code extensions

app/                              # Main application directory
assets/
   css/
      main.css               # Global styles with Tailwind directives
components/                   # Vue components (with README)
composables/                  # Vue composables for shared logic (with README)
layouts/
   app.vue                   # Default app layout (with DaisyUI example)
   README.md                 # Layouts documentation
pages/
   index.vue                 # Home page (with sample content)
   login/
      index.vue              # Login page (awaiting implementation)
   README.md                 # Pages documentation
types/                        # TypeScript type definitions (with README)
utils/                        # Utility functions (with README)
app.config.ts                 # App-level configuration
app.vue                       # Root Vue component (routing enabled)
error.vue                     # Error page component
README.md                     # App directory documentation

prisma/                           # Prisma ORM configuration
migrations/
   20260114235443_init/      # Initial migration
      migration.sql          # User table creation SQL
   migration_lock.toml       # Migration lock file
schema.prisma                 # Database schema definition

public/                           # Static assets served at root
favicon.ico                   # Site favicon
robots.txt                    # Search engine directives

server/                           # Server-side code
api/
   health.get.ts             # Health check endpoint
utils/
   prisma.ts                 # Prisma client singleton
README.md                     # Server documentation

test/                             # Test directory
setup.ts                      # Test setup configuration
README.md                     # Test documentation

.gitignore                        # Git ignore rules
.gitkeep                          # Keep empty directories
eslint.config.mjs                 # ESLint configuration
nuxt.config.ts                    # Nuxt application configuration
package.json                      # Dependencies and npm scripts
package-lock.json                 # Locked dependency versions
README.md                         # Basic setup instructions
tsconfig.json                     # TypeScript configuration
```

### Directory Conventions

#### `/app` Directory

Nuxt 4 uses the `app/` directory as the main source folder:

- **assets/css/** - Global CSS with Tailwind directives and custom styles
- **components/** - Auto-imported Vue components
- **composables/** - Auto-imported composable functions
- **layouts/** - Page layout wrappers
- **pages/** - File-based routing (each file = route)
- **types/** - TypeScript type definitions
- **utils/** - Auto-imported utility functions
- **app.config.ts** - Application-level configuration (runtime)
- **app.vue** - Root component with routing enabled
- **error.vue** - Error handling component

#### `/server` Directory

Server-side code for API routes and utilities:

- **api/** - API endpoints (auto-mapped to routes)
- **utils/** - Server-only utilities (auto-imported)
- Server utilities include Prisma client singleton

#### `/prisma` Directory

Database configuration and migrations:

- **schema.prisma** - Database schema definition
- **migrations/** - Version-controlled database migrations
- PostgreSQL configured as the database provider

#### `/public` Directory

Static assets served as-is without processing:

- Files served from root path (e.g., `/public/favicon.ico` -> `/favicon.ico`)
- No bundling or transformation

---

## Key Files Reference

### Configuration Files

#### `nuxt.config.ts`

**Location**: Root directory
**Purpose**: Main Nuxt application configuration

```typescript
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15", // Nuxt behavior version
  devtools: { enabled: true }, // Vue DevTools in browser
  modules: ["@nuxt/eslint"], // ESLint integration
  eslint: {
    config: {
      standalone: false, // Use project ESLint config
    },
  },
  vite: {
    plugins: [
      tailwindcss(), // Tailwind CSS v4 Vite plugin
    ],
  },
  css: ["~/assets/css/main.css"], // Global CSS imports
});
```

**Key Settings**:

- Development tools enabled for debugging
- ESLint module integrated for in-IDE linting
- Tailwind CSS configured via Vite plugin
- Global CSS imported for Tailwind directives
- Compatibility date set for predictable behavior

#### `eslint.config.mjs`

**Location**: Root directory
**Purpose**: Comprehensive ESLint configuration

**Key Rules**:

- **Code Style**:
  - 2-space indentation
  - Double quotes for strings
  - Semicolons required
- **TypeScript**:
  - `type` definitions preferred over `interface`
  - Redeclaration rules relaxed
- **Vue**:
  - Max 2 attributes per line (single-line)
  - Max 1 attribute per line (multi-line)
- **File Naming**:
  - Enforced kebab-case, camelCase, or PascalCase
  - Exception: `README.md`
- **Imports**:
  - Auto-sorted by `perfectionist/sort-imports`
- **Environment**:
  - `process.env` usage prohibited (use runtime config)
  - Console warnings enabled
  - Top-level await allowed
  - Global process allowed
- **Ignored Paths**:
  - `.npm-store/**`
  - `**/migrations/*`
  - `.claude/**`
- **Special Rules**:
  - `server/utils/prisma.ts` - allows `var` for global singleton pattern

#### `package.json`

**Location**: Root directory
**Purpose**: Project metadata and dependencies

**Key Scripts**:

```bash
npm run dev         # Start dev server (localhost:3000)
npm run build       # Build for production
npm run generate    # Generate static site
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run lint:fix    # Run ESLint with auto-fix
```

**Dependencies**:

- `nuxt` - Framework core
- `vue` - Reactive UI library
- `vue-router` - Routing
- `@nuxt/eslint` - Linting integration
- `@prisma/client` - Prisma database client
- `@tailwindcss/vite` - Tailwind CSS v4 Vite plugin
- `tailwindcss` - Utility-first CSS framework

**Dev Dependencies**:

- `typescript` - Type checking
- `eslint` + `@antfu/eslint-config` - Code quality
- `husky` + `lint-staged` - Git hooks
- `prisma` - Prisma CLI and schema tools
- `daisyui` - Tailwind CSS component library
- `pg` + `@types/pg` - PostgreSQL client
- `tsx` - TypeScript execution
- `dotenv` - Environment variables

**Lint-staged Configuration**:

```js
{
  "lint-staged": {
    "*": "npm run lint"
  }
}
```

Runs linting on all staged files before commit.

#### `tsconfig.json`

**Location**: Root directory
**Purpose**: TypeScript configuration

References auto-generated Nuxt TypeScript configs:

- `.nuxt/tsconfig.app.json` - Application code types
- `.nuxt/tsconfig.server.json` - Server-side code types
- `.nuxt/tsconfig.shared.json` - Shared types
- `.nuxt/tsconfig.node.json` - Build tooling types

### Application Files

#### `app/app.vue`

**Location**: `app/app.vue:1`
**Purpose**: Root Vue component

```vue
<script setup lang="ts">
import "~/assets/css/main.css";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

**Current State**: Routing is now enabled, using NuxtLayout and NuxtPage
**Features**:
- Imports global CSS with Tailwind directives
- Enables file-based routing
- Uses default layout system

#### `app/assets/css/main.css`

**Location**: `app/assets/css/main.css:1`
**Purpose**: Global styles with Tailwind CSS

```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:...");

@import "tailwindcss";
@plugin "daisyui";

html,
body,
#__nuxt {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  background-color: #fff;
  font-family: "DM Sans", sans-serif;
}
```

**Features**:

- DM Sans variable font (Google Fonts)
- Tailwind CSS v4 imports
- DaisyUI component library plugin
- Full-height layout
- Horizontal overflow hidden
- White background

#### `app/pages/index.vue`

**Location**: `app/pages/index.vue:1`
**Purpose**: Home page route
**Route**: `/`

```vue
<script setup lang="ts">
definePageMeta({
  layout: "app",
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">
      Sample Page
    </h1>
    <p class="mt-2 text-white/60">
      Welcome to Nuxt 4!
    </p>
  </div>
</template>
```

**Features**:
- Uses "app" layout
- Demonstrates Tailwind CSS utility classes
- Sample content for testing

#### `app/pages/login/index.vue`

**Location**: `app/pages/login/index.vue:1`
**Purpose**: Login page route
**Route**: `/login`
**Status**: Empty file - awaiting implementation

#### `app/layouts/app.vue`

**Location**: `app/layouts/app.vue:1`
**Purpose**: Default application layout

```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline text-black">
      Sample Texts
      <button class="btn btn-accent">
        Accent
      </button>
    </h1>
  </div>
</template>
```

**Features**:
- Demonstrates Tailwind CSS utility classes
- Shows DaisyUI button component
- Wraps all pages using this layout

#### `app/error.vue`

**Location**: `app/error.vue:1`
**Purpose**: Global error handling component

**Status**: Empty template - ready for custom error page implementation

### Database & Server Files

#### `prisma/schema.prisma`

**Location**: `prisma/schema.prisma:1`
**Purpose**: Database schema definition

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Features**:
- PostgreSQL database provider
- Auto-generated Prisma Client
- User model with basic fields
- Email uniqueness constraint
- Automatic timestamps

**Initial Migration**: `20260114235443_init`
- Creates User table
- Sets up primary key and unique constraints

#### `server/utils/prisma.ts`

**Location**: `server/utils/prisma.ts:1`
**Purpose**: Prisma Client singleton for server-side use

```typescript
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function prismaClientSingleton() {
  return new PrismaClient();
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
```

**Features**:
- Singleton pattern prevents multiple instances
- Development mode caching via global variable
- Auto-imported in server context
- Type-safe database access

#### `server/api/health.get.ts`

**Location**: `server/api/health.get.ts:1`
**Purpose**: Health check API endpoint
**Route**: `GET /api/health`

```typescript
export default defineEventHandler(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    };
  }
  catch (error) {
    return {
      status: "error",
      database: "failed",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
```

**Features**:
- Tests database connectivity
- Returns JSON status response
- Error handling with informative messages
- Demonstrates Prisma usage in API routes

### CI/CD Configuration

#### `.github/workflows/ci.yaml`

**Location**: `.github/workflows/ci.yaml:1`
**Purpose**: GitHub Actions CI pipeline

```yaml
name: Node.js CI
on:
  pull_request:
    branches: [main]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: v24.12.0
      - run: npm ci
      - run: npm run lint:fix
```

**Triggers**: Pull requests to `main` branch
**Actions**:

1. Checkout code
2. Setup Node.js v24.12.0
3. Install dependencies with `npm ci`
4. Run linting with auto-fix

### Git Configuration

#### `.husky/pre-commit`

**Location**: `.husky/pre-commit:1`
**Purpose**: Pre-commit git hook

Runs `lint-staged` before every commit, which executes `npm run lint` on staged files. Prevents committing code that doesn't meet linting standards.

#### `.gitignore`

**Location**: `.gitignore:1`
**Purpose**: Exclude files from git tracking

**Ignored Items**:

- Build outputs (`.output`, `.nuxt`, `dist`)
- Dependencies (`node_modules`)
- Logs (`*.log`)
- Environment files (`.env`, `.env.*`)
- Editor files (`.DS_Store`, `.idea`)
- Generated Prisma files (`/app/generated/prisma`)

---

## Development Guide

### Getting Started

#### Prerequisites

- Node.js v24.12.0 or higher (recommended)
- npm, pnpm, yarn, or bun package manager
- Git for version control
- PostgreSQL database (local or remote)

#### Initial Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd split-ease-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   This will:
   - Install all dependencies from `package.json`
   - Run `nuxt prepare` (postinstall hook)
   - Setup Husky git hooks
   - Generate Prisma Client

3. **Setup environment variables**:

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/split_ease"
   ```

4. **Run database migrations**:

   ```bash
   npx prisma migrate dev
   ```

   This will:
   - Apply all pending migrations
   - Generate Prisma Client
   - Sync your database schema

5. **Start development server**:

   ```bash
   npm run dev
   ```

   - Server runs at `http://localhost:3000`
   - Hot module replacement (HMR) enabled
   - TypeScript checking active
   - ESLint running in watch mode
   - API available at `http://localhost:3000/api/*`

### Development Workflow

#### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

#### 2. Write Code

- Add components in `app/components/`
- Create pages in `app/pages/`
- Add composables in `app/composables/`
- Define types in `app/types/`

#### 3. Lint Your Code

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

#### 4. Commit Changes

```bash
git add .
git commit -m "your commit message"
```

Pre-commit hook automatically runs linting on staged files.

#### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

CI pipeline will run linting on pull request.

### File-Based Routing

Routing is now enabled in the application.

**Example Routes**:

```
app/pages/index.vue           ->  /
app/pages/login/index.vue     ->  /login
app/pages/users/[id].vue      ->  /users/:id (dynamic)
app/pages/expenses/index.vue  ->  /expenses
```

**Nested Routes**:

```
app/pages/dashboard/
  index.vue               ->  /dashboard
  expenses.vue            ->  /dashboard/expenses
  groups.vue              ->  /dashboard/groups
```

### Component Auto-Import

Components in `app/components/` are automatically available:

```vue
<!-- app/components/user-card.vue -->
<template>
  <div class="user-card">
    {{ name }}
  </div>
</template>

<!-- Can be used anywhere without import -->
<template>
  <UserCard name="John" />
</template>
```

**Naming Conventions**:

- File: `user-card.vue` (kebab-case, enforced)
- Component: `<UserCard>` (PascalCase in templates)

### Composables

Create reusable logic in `app/composables/`:

```typescript
// app/composables/use-user.ts
export function useUser() {
  const user = ref(null);
  const fetchUser = async (id: string) => {
    // fetch logic
  };
  return { user, fetchUser };
}

// Usage (auto-imported)
const { user, fetchUser } = useUser();
```

### TypeScript Support

**Type Definitions**:

```typescript
// app/types/user.ts
// Usage
import type { User } from "~/types/user";

export type User = {
  id: string;
  name: string;
  email: string;
};
```

**Auto-Generated Types**:
Nuxt automatically generates types for:

- Route names and params
- Component props
- Composables
- API endpoints

### Environment Variables

**Runtime Config** (recommended):

```js
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: "", // Server-only
    public: {
      apiBase: "", // Client-accessible
    },
  },
});

// Usage example
const config = useRuntimeConfig();
// Access config.public.apiBase in your components
```

**Do NOT use `process.env`** - ESLint will error (rule: `node/no-process-env`)

### Working with Prisma

#### Database Schema Changes

1. **Modify the schema**:

   Edit `prisma/schema.prisma` to add or modify models:

   ```prisma
   model Expense {
     id        Int      @id @default(autoincrement())
     amount    Decimal
     description String
     userId    Int
     user      User     @relation(fields: [userId], references: [id])
     createdAt DateTime @default(now())
   }
   ```

2. **Create a migration**:

   ```bash
   npx prisma migrate dev --name add_expense_model
   ```

   This will:
   - Generate migration SQL
   - Apply migration to database
   - Regenerate Prisma Client with new types

3. **View database in Prisma Studio**:

   ```bash
   npx prisma studio
   ```

   Opens a GUI at `http://localhost:5555` to view and edit data

#### Using Prisma in Server Routes

```typescript
// server/api/users.get.ts
export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return users;
});

// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
    },
  });

  return user;
});
```

**Important**: Prisma is auto-imported in server context via `server/utils/prisma.ts`

#### Common Prisma Commands

```bash
npx prisma generate        # Regenerate Prisma Client
npx prisma migrate dev     # Create and apply migration
npx prisma migrate reset   # Reset database (WARNING: deletes all data)
npx prisma studio          # Open database GUI
npx prisma db push         # Push schema changes without migration (dev only)
```

### Working with Tailwind CSS & DaisyUI

#### Using Tailwind Utility Classes

```vue
<template>
  <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
    <h1 class="text-2xl font-bold text-gray-900">
      Hello World
    </h1>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click Me
    </button>
  </div>
</template>
```

#### Using DaisyUI Components

DaisyUI provides pre-built component classes:

```vue
<template>
  <div>
    <!-- Buttons -->
    <button class="btn">Normal</button>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-accent">Accent</button>

    <!-- Cards -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Card Title</h2>
        <p>Card content here</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Action</button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <dialog class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Modal Title</h3>
        <p class="py-4">Modal content</p>
      </div>
    </dialog>
  </div>
</template>
```

**DaisyUI Documentation**: [https://daisyui.com/components/](https://daisyui.com/components/)

#### Custom Styles

Add custom CSS in `app/assets/css/main.css`:

```css
/* After Tailwind imports */
.custom-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}

.custom-button:hover {
  @apply bg-blue-600;
}
```

---

## Code Quality & Standards

### ESLint Rules Summary

#### Enforced Standards

**Required**:

- Semicolons at end of statements
- Double quotes for strings
- 2-space indentation
- Kebab-case file names
- Sorted imports
- Type definitions over interfaces

**Warnings**:

- Console statements (console.log, etc.)

**Prohibited**:

- process.env access (use runtime config)
- Using interface (use type instead)

#### Vue-Specific Rules

Good example - max 1 attribute per line for multiline:

```html
<template>
  <button class="btn" @click="handleClick">Click me</button>
</template>
```

Bad example - too many attributes on one line:

```html
<template>
  <button class="btn" type="submit" @click="handleClick">Click me</button>
</template>
```

#### TypeScript Rules

Good example - use type instead of interface:

```typescript
export type User = {
  id: string;
  name: string;
};
```

Bad example - interface is not allowed:

```typescript
export type User = {
  id: string;
  name: string;
};
```

#### File Naming

Good examples (kebab-case):

```
user-profile.vue
use-auth.ts
api-client.ts
```

Bad examples (not kebab-case):

```
UserProfile.vue
useAuth.ts
apiClient.ts
```

### Git Workflow

#### Pre-Commit Hook

Every commit triggers `lint-staged`:

1. Identifies staged files
2. Runs `npm run lint` on those files
3. Blocks commit if linting fails
4. Shows errors to fix

#### Bypassing Hooks (Not Recommended)

```bash
git commit --no-verify  # Skip pre-commit hook
```

WARNING: Only use in emergencies - CI will still fail if code doesn't lint.

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/ci.yaml:1`

**Trigger**: Pull requests to `main` branch

**Steps**:

1. **Checkout**: Clone repository code
2. **Setup**: Install Node.js v24.12.0
3. **Install**: Run `npm ci` for clean dependency install
4. **Lint**: Execute `npm run lint:fix`

**Failure Cases**:

- Linting errors that can't be auto-fixed
- TypeScript type errors
- Missing dependencies

**Success**: Green checkmark on PR, ready for review

### Local Testing Before Push

Replicate CI locally:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm ci

# Run lint
npm run lint:fix

# If successful, push with confidence
```

---

## Current State & Next Steps

### What's Complete

1. **Infrastructure**:
   - Nuxt 4 framework setup
   - TypeScript configuration
   - ESLint with comprehensive rules
   - Git hooks (Husky + lint-staged)
   - GitHub Actions CI pipeline

2. **Project Structure**:
   - Organized directory layout
   - File-based routing enabled
   - Layout system active
   - Asset pipeline configured

3. **Development Environment**:
   - Auto-imports for components/composables
   - Hot module replacement
   - TypeScript checking
   - VS Code integration with recommended extensions

4. **Database & ORM**:
   - Prisma 6.19.2 configured with PostgreSQL
   - Initial User model and migration
   - Prisma Client singleton for server use
   - Health check API endpoint

5. **Styling Framework**:
   - Tailwind CSS 4.1.18 integrated via Vite plugin
   - DaisyUI 5.5.14 component library
   - Custom global styles with DM Sans font
   - Sample pages demonstrating styling

### What's Missing

1. **Core Features**:
   - User authentication implementation
   - Full expense tracking functionality
   - Group management features
   - Payment reconciliation logic
   - State management (if needed)

2. **UI/UX**:
   - Complete design system
   - Production-ready components
   - Responsive layouts for all pages
   - Accessibility enhancements
   - Loading states and error boundaries

3. **Backend**:
   - Complete database schema (expenses, groups, payments)
   - Authentication middleware
   - Full CRUD API routes
   - Data validation and sanitization
   - Authorization logic

4. **Testing**:
   - Unit tests
   - Integration tests
   - E2E tests
   - Test configuration and setup

### Recommended Next Steps

#### Phase 1: Authentication & User Management

1. **Design System Refinement**:
   - Define color palette using DaisyUI themes
   - Create reusable component library
   - Establish typography hierarchy
   - Build common UI patterns (forms, cards, modals)

2. **Authentication**:
   - Implement login page UI (`app/pages/login/index.vue:1`)
   - Add registration page
   - Set up authentication library (e.g., Nuxt Auth, Lucia)
   - Create authentication middleware
   - Implement protected routes
   - Add password hashing (bcrypt/argon2)

3. **User Profile**:
   - Create user profile page
   - Implement profile editing
   - Add avatar upload functionality

#### Phase 2: Core Features

1. **Database Schema Expansion**:
   - Add Expense model with relations
   - Add Group model for shared expenses
   - Add GroupMember junction table
   - Add Payment/Settlement model
   - Create migrations for all models

2. **Expense Management**:
   - Create expense entry form
   - Display expense lists with filtering
   - Implement expense splitting logic
   - Add expense categories
   - Support for receipts/attachments

3. **API Development**:
   - Create CRUD endpoints for expenses
   - Implement group management APIs
   - Add payment/settlement APIs
   - Implement proper validation with Zod/Valibot
   - Add error handling and logging

3. **State Management**:
   - Evaluate need for Pinia/global state
   - Implement user session management
   - Handle app-wide notifications

#### Phase 3: Feature Development

1. **Expense Management**:
   - Create expense entry forms
   - Display expense lists
   - Calculate splits

2. **Group Management**:
   - Create/edit groups
   - Invite members
   - Manage permissions

3. **Reconciliation**:
   - Calculate balances
   - Suggest settlements
   - Track payments

#### Phase 4: Polish

1. **Testing**:
   - Configure Vitest or Jest
   - Write component tests
   - Add E2E tests with Playwright

2. **Performance**:
   - Optimize bundle size
   - Implement lazy loading
   - Add caching strategies

3. **Deployment**:
   - Configure production build
   - Set up hosting (Vercel, Netlify, etc.)
   - Add monitoring and analytics

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run generate     # Static site generation

# Code Quality
npm run lint         # Check linting
npm run lint:fix     # Auto-fix linting issues

# Prisma/Database
npx prisma studio         # Open database GUI
npx prisma migrate dev    # Create and apply migration
npx prisma generate       # Regenerate Prisma Client
npx prisma db push        # Push schema without migration (dev)

# Git
git add .
git commit -m "msg"  # Triggers pre-commit hook
git push             # Triggers CI on PR
```

### Important Paths

```
app/app.vue                    # Root component (routing enabled)
app/pages/                     # Routes (file-based routing)
app/components/                # Auto-imported components
app/composables/               # Auto-imported composables
app/assets/css/main.css        # Global styles with Tailwind
server/api/                    # API endpoints
server/utils/prisma.ts         # Prisma client singleton
prisma/schema.prisma           # Database schema
nuxt.config.ts                 # Main configuration
eslint.config.mjs              # Linting rules
.github/workflows/ci.yaml      # CI pipeline
```

### Key Concepts

- **Auto-imports**: No need to import components, composables, or utils
- **File-based routing**: File structure = route structure (now enabled)
- **TypeScript**: Fully integrated with auto-generated types
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Tailwind CSS**: Utility-first styling with DaisyUI components
- **SSR**: Server-side rendering enabled by default
- **Linting**: Enforced via git hooks and CI

---

## Additional Resources

### Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

### Community

- [Nuxt Discord](https://discord.com/invite/nuxt)
- [Vue Discord](https://discord.com/invite/vue)
- [Prisma Discord](https://pris.ly/discord)

### VS Code Extensions

Recommended extensions (defined in `.vscode/extension.json`):
- **ESLint** (dbaeumer.vscode.eslint) - Code linting
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss) - Tailwind autocomplete
- **Vue - Official** (Vue.volar) - Vue 3 language support

---

**Last Updated**: 2026-01-15
**Project Version**: Early Development - Database & Styling Configured
**Nuxt Version**: 4.2.2
**Prisma Version**: 6.19.2
**Tailwind CSS Version**: 4.1.18
**Node Version**: v24.12.0 (recommended)
