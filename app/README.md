# App Directory

This is the Nuxt 3 application directory containing all frontend code for SplitEase.

## Directory Structure

### Core Files

- `app.vue` - Root Vue component, wraps all pages
- `app.config.ts` - App-level configuration (theme, runtime settings)
- `error.vue` - Global error page for 404 and 500 errors

### Directories

#### `/assets`

Static assets that need build-time processing.

- `main.css` - Global styles and Tailwind directives

#### `/components`

Reusable Vue components organized by feature:

- `auth/` - Authentication-related components
- `expenses/` - Expense management components
- `groups/` - Group management components
- `balances/` - Balance calculation and display components
- `ui/` - Generic UI components (buttons, forms, modals)

#### `/composables`

Vue composables for shared reactive logic and business logic.

#### `/layouts`

Page templates that wrap page content:

- `app.vue` - Default layout for authenticated pages

#### `/pages`

File-based routing. Each `.vue` file becomes a route:

- `login/` - Login and authentication pages
- Additional routes created automatically based on file structure

#### `/types`

TypeScript type definitions specific to the frontend:

- Client-side specific types (UI state, form data)
- Separate from server types to avoid importing server-only code

#### `/utils`

Utility functions and helpers for the frontend.

## Nuxt 3 Auto-imports

The following are auto-imported by Nuxt:

- Components from `/components`
- Composables from `/composables`
- Utils from `/utils`
- Vue APIs (ref, computed, watch, etc.)
- Nuxt APIs (useRouter, useRoute, navigateTo, etc.)

No explicit imports needed for these files!
