<script setup lang="ts">
// login page
defineOptions({ name: "LoginPage" });
definePageMeta({
  layout: "app",
});

const hello = "hello world";

console.warn(hello);
</script>

<template>
  <div class="">
    <h1 class="text-3xl font-bold text-black">
      Login Page
    </h1>
    <div class="test">
      <AppThemeToggle />
    </div>
  </div>
</template>
