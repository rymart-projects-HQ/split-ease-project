# Layouts

Page templates that wrap page content and provide consistent structure across routes.

## Available Layouts

### `app.vue`

The main application layout wrapper used by most pages.

**Purpose:** Provides the primary layout structure for the application.

**Usage:** Applied via `definePageMeta({ layout: "app" })`

**Structure:**

```vue
<div class="min-h-screen relative flex-col bg-primary-content">
  <main>
    <slot />
  </main>
</div>
```

**Styling:**

- `min-h-screen` - Full viewport height minimum
- `relative` - Positioned relative for child elements
- `flex-col` - Flexbox column layout
- `bg-primary-content` - DaisyUI primary content background color

**Used by:**

- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Dashboard page
- `/landing-page` - Landing page

---

### `default.vue`

Alternative layout for public/authentication pages with a dark centered design.

**Purpose:** Provides a dark-themed, centered layout for standalone pages.

**Structure:**

```vue
<div class="min-h-screen flex items-center justify-center bg-[#0b1220] text-white">
  <slot />
</div>
```

**Styling:**

- `min-h-screen` - Full viewport height minimum
- `flex items-center justify-center` - Centers content both vertically and horizontally
- `bg-[#0b1220]` - Dark navy background color
- `text-white` - White text color

**Use cases:**

- Standalone authentication pages
- Error pages
- Simple centered content pages

---

## Layout Selection

Layouts are applied to pages using `definePageMeta`:

```vue
<script setup>
definePageMeta({
  layout: "app" // or "default"
});
</script>
```

If no layout is specified, Nuxt uses `default.vue` automatically.

## Future Layouts

### `dashboard.vue` (Planned)

A dedicated layout for authenticated dashboard pages with:

- Sidebar navigation
- Header with user profile
- Main content area
- Protected route wrapper
