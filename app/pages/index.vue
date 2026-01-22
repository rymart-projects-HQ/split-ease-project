<script setup lang="ts">
definePageMeta({
  layout: "app",
});

// TODO: Add auth check later
// if (isAuthenticated) navigateTo('/dashboard')
// else navigateTo('/landing-page')

onMounted(() => {
  navigateTo("/landing-page");
});
</script>

<template>
  <div class="main" />
</template>
