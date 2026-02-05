<script setup lang="ts">
import type { NuxtError } from "#app";

const _props = defineProps<{
  error: NuxtError;
}>();

function handleError() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="text-center max-w-md w-full">
      <h1 class="text-9xl font-bold text-[#10b981]">
        {{ error?.statusCode || 404 }}
      </h1>
      <div class="divider" />
      <h2 class="text-2xl md:text-3xl font-semibold mb-4 text-[#10b981]">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Oops! Something went wrong' }}
      </h2>
      <p class="text-base-content/70 mb-8">
        {{ error?.message || "The page you're looking for doesn't exist or has been moved." }}
      </p>
      <button class="btn bg-[#10b981] btn-wide rounded-[10px]" @click="handleError">
        Back to Home
      </button>
    </div>
  </div>
</template>
