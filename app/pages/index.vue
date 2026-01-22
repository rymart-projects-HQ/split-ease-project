<script setup lang="ts">
definePageMeta({
  layout: "app",
});

const gridItems = [
  {
    itemName: "Group Management",
    itemDescription: "Create and manage groups for roommates, trips, or any shared expenses",
    iconName: "material-symbols:group-outline",
  },
  {
    itemName: "Easy Expense Tracking",
    itemDescription: "Log expenses quickly with equal or custom split options for each member",
    iconName: "material-symbols-light:attach-money",
  },
  {
    itemName: "Smart Balance Calculation",
    itemDescription: "Automatically calculates who owes what with simplified debt tracking",
    iconName: "material-symbols-light:pie-chart",
  },
  {
    itemName: "Activity Feed",
    itemDescription: "Stay updated with real-time transaction history and group activity",
    iconName: "material-symbols:notifications-outline",
  },
  {
    itemName: "Secure & Private",
    itemDescription: "Your financial data is protected with industry-standard security",
    iconName: "material-symbols:shield-outline",
  },
  {
    itemName: "Mobile First Design",
    itemDescription: "Beautiful, responsive interface that works perfectly on any device",
    iconName: "material-symbols:mobile-2-outline",
  },
];

const whyChooseItems = [
  "No more awkward money conversations",
  "Track shared expenses in real-time",
  "Settle up with confidence",
  "Perfect for roommates, trips, and teams",
  "Free to use, no hidden fees",
  "Simple and intuitive interface",
];
</script>

<template>
  <div class="main ">
    <AppNavbar />
    <div class="bg-base-200">
      <!-- default page for not loggedin users -->
      <div class="hero min-h-screen">
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
      <section class="second bg-base-100 ">
        <div class="min-h-screen flex flex-col justify-center max-w-sm xl:max-w-7xl mx-auto">
          <div class="header flex flex-col justify-center items-center my-10 gap-4">
            <p class="xl:text-4xl text-md text-center">
              Everything you need to split expenses
            </p>
            <p class="text-base-content/60 xl:text-xl text-md">
              Powerful features that make sharing expenses simple and stress-free
            </p>
          </div>
          <div class="grid-items grid grid-cols-3 gap-6">
            <div
              v-for="(item, index) in gridItems"
              :key="index"
              class="item rounded-[10px] flex flex-col justify-start p-8 border border-gray-100/20 hover:border-[#10b981] bg-base-300 gap-2 transition-colors duration-300"
            >
              <div class="p-2 bg-[#10b981]/20 rounded-[10px] w-fit flex items-center justify-center">
                <Icon
                  :name="item.iconName"
                  size="24"
                  class="text-[#10b981] p-0 m-0"
                />
              </div>
              <p class="title text-nuetral-content">
                {{ item.itemName }}
              </p>
              <p class="description text-base-content/60">
                {{ item.itemDescription }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="third bg-base-200">
        <div class="min-h-screen flex flex-col justify-center max-w-sm xl:max-w-7xl mx-auto py-10">
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16">
            <div class="left flex flex-col justify-center gap-6">
              <h2 class="text-3xl xl:text-5xl">
                Why choose SplitEase?
              </h2>
              <p class="text-base-content/60 text-md xl:text-xl">
                We've designed SplitEase to be the simplest, most intuitive way to manage shared expenses. No complicated setup, no hidden fees.
              </p>
              <div class="features flex flex-col gap-4">
                <div
                  v-for="(item, index) in whyChooseItems"
                  :key="index"
                  class="feature-item flex flex-row items-center gap-3"
                >
                  <Icon
                    name="material-symbols:check-circle-outline-rounded"
                    size="24"
                    class="text-[#10b981]"
                  />
                  <p class="text-md xl:text-lg">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>
            <div class="right flex items-center justify-center">
              <div class="card bg-[#10b981]/10 rounded-[20px] p-10 xl:p-16 flex flex-col items-center justify-center gap-6 border border-[#10b981] w-[calc(100%+100px)] h-[calc(100%+180px)]">
                <div class="icon-wrapper">
                  <Icon
                    name="material-symbols:bolt-outline-rounded"
                    size="150"
                    class="text-[#10b981]"
                  />
                </div>
                <h3 class="text-2xl xl:text-3xl text-center">
                  Fast & Efficient
                </h3>
                <p class="text-base-content/60 text-md xl:text-lg text-center">
                  Split bills in seconds, not minutes. Our smart algorithms handle the math for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="fourth bg-[#10b981]">
        <div class="min-h-[60vh] flex flex-col justify-center items-center max-w-sm xl:max-w-4xl mx-auto py-10 px-6">
          <div class="content flex flex-col items-center gap-8">
            <h2 class="text-3xl xl:text-5xl text-center text-white">
              Ready to simplify your shared expenses?
            </h2>
            <p class="text-md xl:text-xl text-center text-white/90">
              Join thousands of users who trust SplitEase to manage their group finances.
            </p>
            <button class="btn bg-white text-[#10b981] rounded-[20px] xl:text-xl py-8 px-6 flex items-center gap-2 hover:bg-white/90 transition-colors duration-300 border-0">
              Get Started Now
              <Icon
                name="tabler:arrow-narrow-right"
                size="24"
                class="text-[#10b981]"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
    <AppFooter />
  </div>
</template>
