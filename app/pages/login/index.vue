<script setup lang="ts">
// login page
defineOptions({ name: "LoginPage" });
definePageMeta({
  layout: "app",
});
</script>

<template>
  <div class="main">
    <div class="hero bg-base-200 min-h-screen flex flex-col">
      <div class="flex justify-left ">
        <AppThemeToggle />
      </div>
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">
            Hello there
          </h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
