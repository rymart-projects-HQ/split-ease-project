<!-- eslint-disable style/no-multiple-empty-lines, style/eol-last -->

# Layouts Directory

Page templates that wrap page content in Split Ease.

## What are Layouts?

Layouts are wrapper components that provide consistent structure across multiple pages. They typically include navigation, footers, and common UI elements.

## Available Layouts

### [default.vue](./default.vue)

Default layout for public/unauthenticated pages.

**Used by**:

- Landing page
- Login page
- Signup page
- Public-facing pages

**Features**:

- Minimal navigation
- Public header/footer
- No authentication required

**Usage in pages**:

```vue
<script setup lang="ts">
definePageMeta({
  layout: "default"
});
</script>
```

### [app.vue](./app.vue)

Layout for authenticated application pages.

**Used by**:

- Dashboard
- Expense management
- Group management
- User settings
- Other authenticated pages

**Features**:

- Full navigation with user menu
- Authentication required
- Application-specific UI elements

**Usage in pages**:

```vue
<script setup lang="ts">
definePageMeta({
  layout: "app"
});
</script>
```

## How Layouts Work

Layouts use the `<slot />` component to render page content:

```vue
<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen">
    <AppNavbar />
    <main>
      <slot /> <!-- Page content goes here -->
    </main>
    <AppFooter />
  </div>
</template>
```

## Creating a New Layout

### Example: Dashboard Layout

```vue
<!-- layouts/dashboard.vue -->
<script setup lang="ts">
const user = useSupabaseUser();

// Redirect if not authenticated
if (!user.value) {
  navigateTo("/login");
}
</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <!-- Sidebar navigation -->
    </aside>
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
}
</style>
```

## Layout Selection

### Method 1: Page Meta (Recommended)

```vue
<script setup lang="ts">
definePageMeta({
  layout: "app" // or 'default', 'dashboard', etc.
});
</script>
```

### Method 2: Dynamic Layout

```vue
<script setup lang="ts">
const layout = ref("default");

function switchLayout() {
  layout.value = "app";
}
</script>

<template>
  <NuxtLayout :name="layout">
    <YourContent />
  </NuxtLayout>
</template>
```

### Method 3: No Layout

```vue
<script setup lang="ts">
definePageMeta({
  layout: false // No layout wrapper
});
</script>
```

## Layout Best Practices

1. **Keep layouts simple** - Focus on structure, not business logic
2. **Use composition** - Leverage components for complex UI parts
3. **Handle authentication** - Check auth state in protected layouts
4. **Responsive design** - Ensure layouts work on all screen sizes
5. **Consistent spacing** - Use Tailwind utilities for consistent padding/margins

## Layout Structure Pattern

```vue
<script setup lang="ts">
// Auth checks, navigation logic, etc.
const user = useSupabaseUser();
</script>

<template>
  <div class="layout-container">
    <!-- Header/Navigation -->
    <header>
      <AppNavbar />
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
```

## Nested Layouts

Nuxt supports nested layouts for complex page structures:

```vue
<!-- layouts/parent.vue -->
<template>
  <div>
    <slot name="sidebar" />
    <slot />
  </div>
</template>

<!-- pages/nested.vue -->
<template>
  <NuxtLayout name="parent">
    <template #sidebar>
      <MySidebar />
    </template>
    <MyContent />
  </NuxtLayout>
</template>
```

## Styling Layouts

Use Tailwind CSS for layout styling:

```vue
<template>
  <div class="min-h-screen bg-base-100">
    <header class="navbar bg-base-200 shadow-lg">
      <slot name="header" />
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="footer bg-base-300 p-10">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

## Layout Transitions

Add smooth transitions between layouts:

```vue
<!-- nuxt.config.ts -->
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  }
})
```

```css
/* assets/css/main.css */
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.3s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

```

## Related Documentation

- [Nuxt Layouts Guide](https://nuxt.com/docs/guide/directory-structure/layouts)
- [Vue Slots Documentation](https://vuejs.org/guide/components/slots.html)
- [Main App README](../README.md)
