<script setup lang="ts">
definePageMeta({
  layout: "app",
});
</script>

<template>
  <div class="main ">
    <AppNavbar />
    <div class="">
      <!-- default page for not loggedin users -->
      <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content text-center ">
          <div class="max-w-md xl:max-w-4xl flex flex-col justify-center items-center">
            <div class="app-logo relative">
              <div class="absolute inset-0 bg-[#10b981] rounded-2xl blur-xl opacity-40" />
              <img
                src="/assets/splitease-logo.svg"
                class="w-30 h-30"
                alt="splitease logo"
              >
            </div>
            <h1 class="text-7xl ">
              Split expenses seamlessly <span class="text-[#10b981]">with your group</span>
            </h1>
            <p class="py-6 text-md xl:text-xl text-base-content/60">
              The easiest way to share bills and track group expenses. Perfect for roommates, trips, and small teams.
            </p>
            <div class="cta flex flex-row justify-center items-center gap-6">
              <button class="get-started btn text-base-content bg-[#10b981] rounded-[20px] xl:text-xl py-8 px-5 flex items-center gap-2 group">
                Get Started Free
                <Icon
                  class="transition-transform duration-300 group-hover:translate-x-1"
                  size="30"
                  name="tabler:arrow-narrow-right"
                />
              </button>
              <button class="sign-in btn text-base-content btn-outline border-2 border-base-content/60 hover:border-[#10b981] xl:text-xl py-8 px-5 rounded-[20px]">
                Sign in
              </button>
            </div>
            <p class="label pt-10 text-[16px]">
              Free Forever
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
