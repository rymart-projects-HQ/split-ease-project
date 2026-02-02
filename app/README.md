# App Directory

This is the Nuxt 4 application directory containing all frontend code for SplitEase.

## Directory Structure

### Core Files

- `app.vue` - Root Vue component with NuxtLoadingIndicator (color: #10b981, duration: 2000ms, height: 3px)
- `app.config.ts` - App-level configuration (theme, runtime settings)
- `error.vue` - Global error page for 404 and 500 errors

### Directories

#### `/assets`

Static assets that need build-time processing.

- `css/main.css` - Global styles and Tailwind directives

#### `/components`

Reusable Vue components:

- `app/themeToggle.vue` - Dark/light mode toggle
- `app/navbar.vue` - Application navigation bar
- `app/footer.vue` - Application footer

#### `/composables`

Vue composables for shared reactive logic and business logic.

#### `/layouts`

Page templates that wrap page content:

- `app.vue` - Layout for application pages

#### `/pages`

File-based routing. See [pages/README.md](pages/README.md) for details.

Current routes:

- `/` - Landing page
- `/login` - User login with form validation
- `/signup` - User registration with password requirements
- `/dashboard` - User dashboard

#### `/types`

TypeScript type definitions specific to the frontend.

#### `/utils`

Utility functions and helpers for the frontend.

## Authentication Pages

Both login and signup pages include:

- **Loading States:** `isLoading` ref for form submission feedback
- **Form Validation:** Email format, password requirements (min 8 chars)
- **UX Features:** Disabled inputs during submission, loading button text
- **Proper Forms:** `<form>` elements with `@submit.prevent`

## Nuxt Auto-imports

The following are auto-imported by Nuxt:

- Components from `/components`
- Composables from `/composables`
- Utils from `/utils`
- Vue APIs (ref, computed, watch, etc.)
- Nuxt APIs (useRouter, useRoute, navigateTo, etc.)

No explicit imports needed for these files.
