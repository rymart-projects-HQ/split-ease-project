<script lang="ts" setup>
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <nav class="navbar w-full bg-base-100 shadow-sm flex flex-row items-center justify-between px-10 z-50">
    <NuxtLink to="/" class="cursor:pointer flex flex-row items-center gap-2">
      <img
        src="/assets/splitease-logo.svg"
        class="w-10 h-10"
        alt=""
      >
      <span class="text-xl font-semibold">SplitEase</span>
    </NuxtLink>
    <div class="lg:block flex-none hidden">
      <div class="flex flex-row items-center gap-5">
        <NuxtLink to="login" class="hover:text-[#10b981]">
          Sign in
        </NuxtLink>
        <button class="btn btn-success rounded-[20px] w-auto lg:w-[170px]">
          <NuxtLink to="login" class="text-primary-content text-lg">
            Get Started
          </NuxtLink>
        </button>
        <AppThemeToggle />
      </div>
    </div>
    <div class="mobile-nav lg:hidden relative">
      <button class="btn-hamburger btn btn-square btn-ghost" @click="toggleMenu">
        <div class="hamburger-icon" :class="{ 'is-active': isMenuOpen }">
          <span class="line line-1" />
          <span class="line line-2" />
          <span class="line line-3" />
        </div>
      </button>
      <Transition name="slide">
        <div
          v-if="isMenuOpen"
          class="slide-items fixed top-0 bottom-0 w-60 md:w-80 right-0 mt-2 p-4 bg-base-100 shadow-lg rounded-lg flex flex-col gap-4 z-40 mt-[50px]"
        >
          <AppThemeToggle />
          <NuxtLink to="login" class="hover:text-[#10b981]">
            Sign in
          </NuxtLink>
          <NuxtLink to="login" class="hover:text-[#10b981]">
            Get Started
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.hamburger-icon {
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-icon .line {
  display: block;
  height: 2px;
  width: 100%;
  background-color: currentColor;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-icon.is-active .line-1 {
  transform: translateY(9px) rotate(45deg);
}

.hamburger-icon.is-active .line-2 {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-icon.is-active .line-3 {
  transform: translateY(-9px) rotate(-45deg);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
