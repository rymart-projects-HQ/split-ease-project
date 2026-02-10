<!-- eslint-disable style/no-multiple-empty-lines, style/eol-last -->

# Pages Directory

File-based routing for Split Ease. Each `.vue` file automatically becomes a route.

## Current Pages

### [index.vue](./index.vue)

**Route:** `/`
**Layout:** `default`
Landing page for Split Ease

### [login/](./login/)

**Route:** `/login`
**Layout:** `app`
User authentication page with email/password and Google OAuth
See [login/README.md](./login/README.md) for details

### [signup/](./signup/)

**Route:** `/signup`
**Layout:** `app`
User registration page
See signup/README.md for details

### [dashboard/](./dashboard/)

**Route:** `/dashboard`
**Layout:** `app`
User dashboard (requires authentication)
See dashboard/README.md for details

### [landing-page/](./landing-page/)

**Route:** `/landing-page`
Alternative landing page layout

## File-Based Routing

Nuxt automatically creates routes based on file structure:

```
pages/
├── index.vue                → /
├── login/
│   └── index.vue           → /login
├── signup/
│   └── index.vue           → /signup
├── dashboard/
│   └── index.vue           → /dashboard
└── groups/
    ├── index.vue           → /groups
    └── [id].vue            → /groups/:id (dynamic)
```

## Creating New Pages

### Basic Page

```vue
<!-- pages/about.vue -->
<script setup lang="ts">
definePageMeta({
  layout: "default"
});
</script>

<template>
  <div>
    <h1>About Split Ease</h1>
    <p>Your expense splitting solution</p>
  </div>
</template>
```

### Dynamic Route

```vue
<!-- pages/groups/[id].vue -->
<script setup lang="ts">
const route = useRoute();
const groupId = route.params.id;

definePageMeta({
  layout: "app"
});
</script>

<template>
  <div>
    <h1>Group {{ groupId }}</h1>
  </div>
</template>
```

### Protected Page (Auth Required)

```vue
<script setup lang="ts">
const user = useSupabaseUser();

definePageMeta({
  layout: "app",
  middleware: "auth" // Custom middleware
});

// Redirect if not authenticated
if (!user.value) {
  navigateTo("/login");
}
</script>

<template>
  <div>
    <h1>Welcome {{ user?.email }}</h1>
  </div>
</template>
```

## Page Meta

Use `definePageMeta()` to configure pages:

```typescript
definePageMeta({
  layout: "default", // Layout to use
  middleware: "auth", // Middleware to run
  title: "Page Title", // Page title
  description: "Description" // Meta description
});
```

## Navigation

### Programmatic Navigation

```typescript
// Simple navigation
navigateTo("/dashboard");

// With params
navigateTo(`/groups/${groupId}`);

// External link
navigateTo("https://example.com", { external: true });

// Replace history
navigateTo("/login", { replace: true });
```

### Component Navigation

```vue
<template>
  <div>
    <!-- NuxtLink for internal routes -->
    <NuxtLink to="/dashboard">
      Dashboard
    </NuxtLink>

    <!-- Regular link for external -->
    <a href="https://example.com">External</a>
  </div>
</template>
```

## Page Transitions

Add smooth transitions between pages:

```vue
<!-- nuxt.config.ts -->
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})
```

```css
/* assets/css/main.css */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

```

## SEO & Meta Tags

```vue
<script setup lang="ts">
useHead({
  title: "Split Ease - Dashboard",
  meta: [
    {
      name: "description",
      content: "Manage your group expenses"
    },
    {
      property: "og:title",
      content: "Split Ease Dashboard"
    }
  ]
});
</script>
```

## Page Best Practices

1. **Use layouts** - Don't repeat navigation/footer code
2. **Lazy load components** - Use `defineAsyncComponent` for heavy components
3. **Handle loading states** - Show loaders while fetching data
4. **Error handling** - Catch and display errors gracefully
5. **Meta tags** - Always set proper title and description
6. **Mobile-first** - Design for mobile, enhance for desktop

## Related Documentation

- [Nuxt Pages Directory](https://nuxt.com/docs/guide/directory-structure/pages)
- [Vue Router](https://router.vuejs.org/)
- [Main App README](../README.md)
