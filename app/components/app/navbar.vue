<script lang="ts" setup>

</script>

<template>
  <div class="navbar bg-base-100 shadow-sm flex flex-row items-center justify-between px-10">
    <NuxtLink to="/" class="cursor:pointer flex flex-row items-center gap-2">
      <img
        src="/assets/splitease-logo.svg"
        class="w-10 h-10"
        alt=""
      >
      <a class="text-xl font-semibold">SplitEase</a>
    </NuxtLink>
    <div class="flex-none">
      <div class="flex flex-row items-center gap-5">
        <a href="#" class=" hover:text-[#10b981]">Signin</a>
        <button class="btn btn-success rounded-[20px] w-auto lg:w-[170px]">
          <a href="#" class="text-primary-content text-lg">Get Started</a>
        </button>
        <AppThemeToggle />
      </div>
    </div>
  </div>
</template>
