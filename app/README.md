# App Directory

This is the Nuxt 4 application directory containing all frontend code for Split Ease.

## Directory Structure

### Core Files

- [app.vue](./app.vue) - Root Vue component, wraps all pages
- `app.config.ts` - App-level configuration (theme, runtime settings)
- `error.vue` - Global error page for 404 and 500 errors

### Directories

#### [/assets](./assets/)

Static assets that need build-time processing.

- [main.css](./assets/css/main.css) - Global styles and Tailwind directives

#### [/components](./components/)

Reusable Vue components. See [components/README.md](./components/README.md) for details.

Current components:

- `app/` - App-specific components (navbar, footer, theme toggle)

#### [/composables](./composables/)

Vue composables for shared reactive logic. See [composables/README.md](./composables/README.md) for details.

Current composables:

- [useSupabaseClient.ts](./composables/useSupabaseClient.ts) - Supabase client instance

#### [/layouts](./layouts/)

Page templates that wrap page content. See [layouts/README.md](./layouts/README.md) for details.

Available layouts:

- `default.vue` - Default layout for public pages
- `app.vue` - Layout for authenticated pages

#### [/pages](./pages/)

File-based routing. Each `.vue` file becomes a route. See [pages/README.md](./pages/README.md) for details.

Current pages:

- [/](./pages/index.vue) - Landing page
- [/login](./pages/login/) - Login page
- [/signup](./pages/signup/) - Signup page
- [/dashboard](./pages/dashboard/) - User dashboard

#### [/types](./types/)

TypeScript type definitions specific to the frontend. See [types/README.md](./types/README.md) for details.

- Client-side specific types (UI state, form data)
- Separate from server types to avoid importing server-only code

#### [/utils](./utils/)

Utility functions and helpers for the frontend. See [utils/README.md](./utils/README.md) for details.

## Nuxt 4 Auto-imports

The following are auto-imported by Nuxt:

- Components from [/components](./components/)
- Composables from [/composables](./composables/)
- Utils from [/utils](./utils/)
- Vue APIs (ref, computed, watch, etc.)
- Nuxt APIs (useRouter, useRoute, navigateTo, etc.)

No explicit imports needed for these files!

## Tech Stack

- **Framework**: Nuxt 4 + Vue 3 Composition API
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Backend Integration**: Supabase (auth + database)
- **Type Safety**: TypeScript

## Related Documentation

- [Main Project README](../README.md)
- [Server API Documentation](../server/README.md)
- [Database Schema](../prisma/README.md)
