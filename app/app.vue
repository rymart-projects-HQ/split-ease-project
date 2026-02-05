<script setup lang="ts">
import "~/assets/css/main.css";
</script>

<template>
  <NuxtLoadingIndicator
    color="#110b981"
    :duration="2000"
    :height="3"
    :throttle="200"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
