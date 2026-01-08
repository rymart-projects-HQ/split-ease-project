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

- **Complete**: Development infrastructure, linting, CI/CD, project scaffolding
- **In Progress**: Core application development
- **Pending**: Feature implementation, database integration, API development

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

### Code Quality Tools

- **Husky 9.1.7** - Git hooks manager for running pre-commit checks
- **lint-staged 16.2.7** - Run linters on staged files only

### Styling

- **DM Sans** - Google Fonts typeface (variable font with weights 100-1000)
- Custom CSS with global styles

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
settings.json                 # ESLint integration for IDE

app/                              # Main application directory
assets/
   main.css                  # Global styles and fonts
components/                   # Vue components (currently empty)
composables/                  # Vue composables for shared logic (empty)
   layouts/
   app.vue                   # Default app layout (empty)
   pages/
   login/
   index.vue             # Login page (empty)
types/                        # TypeScript type definitions (empty)
utils/                        # Utility functions (empty)
app.vue                       # Root Vue component

public/                           # Static assets served at root
favicon.ico                   # Site favicon
robots.txt                    # Search engine directives
test/                             # Test directory
api/
utils/                    # API test utilities (empty)
setup.ts                      # Test setup configuration (empty)
.gitignore                        # Git ignore rules
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

- **assets/** - Global CSS, images, fonts (processed by build tools)
- **components/** - Auto-imported Vue components
- **composables/** - Auto-imported composable functions
- **layouts/** - Page layout wrappers
- **pages/** - File-based routing (each file = route)
- **types/** - TypeScript type definitions
- **utils/** - Auto-imported utility functions

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
});
```

**Key Settings**:

- Development tools enabled for debugging
- ESLint module integrated for in-IDE linting
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
  - Enforced kebab-case (e.g., `user-profile.vue`)
  - Exception: `README.md`
- **Imports**:
  - Auto-sorted by `perfectionist/sort-imports`
- **Environment**:
  - `process.env` usage prohibited (use runtime config)
  - Console warnings enabled
- **Ignored Paths**:
  - `.npm-store/**`
  - `**/migrations/*`

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

**Dev Dependencies**:

- `typescript` - Type checking
- `eslint` + `@antfu/eslint-config` - Code quality
- `husky` + `lint-staged` - Git hooks

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
<script setup>
import "~/assets/main.css";
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />  <!-- Accessibility: announces route changes -->
    <NuxtWelcome />          <!-- Nuxt welcome page (temporary) -->
  </div>
  <!-- <NuxtLayout>             Future: Enable when layouts are ready
    <NuxtPage />
  </NuxtLayout> -->
</template>
```

**Current State**: Displays Nuxt welcome page
**Next Step**: Uncomment `<NuxtLayout>` and `<NuxtPage>` to activate routing

#### `app/assets/main.css`

**Location**: `app/assets/main.css:1`
**Purpose**: Global styles

```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:...");

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
- Full-height layout
- Horizontal overflow hidden
- White background

#### `app/pages/login/index.vue`

**Location**: `app/pages/login/index.vue:1`
**Purpose**: Login page route
**Status**: Empty file - awaiting implementation

When Nuxt routing is enabled, this will be accessible at `/login`.

#### `app/layouts/app.vue`

**Location**: `app/layouts/app.vue:1`
**Purpose**: Default application layout
**Status**: Empty file - awaiting implementation

Will wrap all pages when routing is activated.

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

---

## Development Guide

### Getting Started

#### Prerequisites

- Node.js v24.12.0 or higher (recommended)
- npm, pnpm, yarn, or bun package manager
- Git for version control

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

3. **Start development server**:

   ```bash
   npm run dev
   ```

   - Server runs at `http://localhost:3000`
   - Hot module replacement (HMR) enabled
   - TypeScript checking active
   - ESLint running in watch mode

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

When routing is enabled (uncomment in `app.vue:10`):

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
   - File-based routing setup (disabled)
   - Layout system prepared
   - Asset pipeline configured

3. **Development Environment**:
   - Auto-imports for components/composables
   - Hot module replacement
   - TypeScript checking
   - VS Code integration

### What's Missing

1. **Core Features**:
   - User authentication implementation
   - Database integration
   - API endpoints
   - State management (if needed)
   - Component library

2. **UI/UX**:
   - Design system
   - Styled components
   - Responsive layouts
   - Accessibility features

3. **Backend**:
   - Database schema
   - Server middleware
   - API routes
   - Authentication logic

4. **Testing**:
   - Unit tests
   - Integration tests
   - E2E tests
   - Test configuration

### Recommended Next Steps

#### Phase 1: Foundation

1. **Enable Routing**:
   - Uncomment `<NuxtLayout>` and `<NuxtPage>` in `app/app.vue:10`
   - Verify routing works with existing login page

2. **Design System**:
   - Choose UI library (e.g., Nuxt UI, Vuetify, PrimeVue)
   - Define color palette and typography
   - Create basic component library

3. **Authentication**:
   - Implement login page UI (`app/pages/login/index.vue:1`)
   - Set up authentication middleware
   - Create protected routes

#### Phase 2: Core Features

1. **Database Setup**:
   - Choose database (PostgreSQL, MySQL, SQLite)
   - Define schema for users, expenses, groups
   - Set up ORM/query builder (Prisma, Drizzle, Kysely)

2. **API Development**:
   - Create server API routes in `server/api/`
   - Implement CRUD operations
   - Add validation and error handling

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

# Git
git add .
git commit -m "msg"  # Triggers pre-commit hook
git push             # Triggers CI on PR
```

### Important Paths

```
app/app.vue                    # Root component
app/pages/                     # Routes (when enabled)
app/components/                # Auto-imported components
app/composables/               # Auto-imported composables
nuxt.config.ts                 # Main configuration
eslint.config.mjs              # Linting rules
.github/workflows/ci.yaml      # CI pipeline
```

### Key Concepts

- **Auto-imports**: No need to import components, composables, or utils
- **File-based routing**: File structure = route structure
- **TypeScript**: Fully integrated with auto-generated types
- **SSR**: Server-side rendering enabled by default
- **Linting**: Enforced via git hooks and CI

---

## Additional Resources

### Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

### Community

- [Nuxt Discord](https://discord.com/invite/nuxt)
- [Vue Discord](https://discord.com/invite/vue)

---

**Last Updated**: 2026-01-08
**Project Version**: Early Development
**Nuxt Version**: 4.2.2
**Node Version**: v24.12.0 (recommended)
