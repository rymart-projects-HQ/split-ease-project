<script setup lang="ts">
// signup page
defineOptions({ name: "SignupPage" });
definePageMeta({
  layout: "app",
});

const form = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const touched = reactive({
  fullName: false,
  email: false,
  password: false,
  confirmPassword: false,
});

function validateForm() {
  let isValid = true;

  // Full name validation
  if (!form.fullName.trim()) {
    errors.fullName = "Name is required";
    isValid = false;
  }
  else {
    errors.fullName = "";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  }
  else if (!emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }
  else {
    errors.email = "";
  }

  // Password validation
  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  }
  else {
    errors.password = "";
  }

  // Confirm password validation
  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
    isValid = false;
  }
  else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }
  else {
    errors.confirmPassword = "";
  }

  // Mark all fields as touched
  touched.fullName = true;
  touched.email = true;
  touched.password = true;
  touched.confirmPassword = true;

  return isValid;
}

function handleSubmit() {
  if (validateForm()) {
    // TODO: Handle form submission
    // console.log("Form submitted:", form);
  }
}
</script>

<template>
  <div class="login-main relative">
    <div class="hero bg-base-200 min-h-screen">
      <div class="flex justify-end absolute top-5 right-5 lg:top-10 lg:right-20 p-4 md:p-5 bg-base-100 rounded-[20px] z-1">
        <AppThemeToggle />
      </div>
      <div class="hero-content flex-col text-center w-full max-w-[480px] mx-auto px-4">
        <div class="header flex flex-col gap-2 pb-5">
          <div class="splitease-logo mx-auto flex justify-center">
            <img
              src="/assets/splitease-logo.svg"
              class="w-20 h-20"
              alt=""
            >
          </div>
          <p class="text-16px md:text-[24px]">
            Welcome to SplitEase
          </p>
          <p class="text-base-content/80">
            Join SplitEase and start splitting expenses
          </p>
        </div>
        <div class="w-full bg-base-100 rounded-[20px] border border-gray-100/20 flex flex-col gap-8 p-10">
          <div class="card w-full max-w-md mx-auto flex flex-col gap-3">
            <button class="btn btn-md border border-gray-600 lg:btn-lg xl:btn-xl rounded-[10px] text-[16px]">
              <img
                src="/login/google-icon.svg"
                alt="Google icon"
                class="w-5 h-5"
              >
              Continue with Google
            </button>
          </div>
          <div class="flex flex-row items-center gap-4 w-full max-w-md mx-auto my-4">
            <div class="flex-1 h-[1px] bg-base-content/20" />
            <div class="text-base-content/60 text-sm whitespace-nowrap">
              Or register with email
            </div>
            <div class="flex-1 h-[1px] bg-base-content/20" />
          </div>
          <div class="form w-full max-w-md mx-auto flex flex-col gap-4 text-left">
            <!-- Full Name -->
            <div class="flex flex-col gap-2">
              <label class="text-base-content text-sm font-medium text-left">Full name</label>
              <div class="relative">
                <span class="absolute left-2 top-[33px] -translate-y-1/2 text-base-content/40 z-10">
                  <Icon name="material-symbols:person-outline-rounded" class="w-5 h-5" />
                </span>
                <input
                  v-model="form.fullName"
                  type="text"
                  placeholder="John Doe"
                  class="input input-bordered w-full pl-7 bg-base-100 border focus:outline-[#10b981] active:outline-[#10b981] focus:border-none rounded-lg h-14"
                  :class="touched.fullName && errors.fullName ? 'border-red-500' : 'border-base-content/20'"
                >
              </div>
              <span v-if="touched.fullName && errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</span>
            </div>
            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label class="text-base-content text-sm font-medium text-left">Email address</label>
              <div class="relative">
                <span class="absolute left-2 top-[33px] -translate-y-1/2 text-base-content/40 z-10">
                  <Icon name="material-symbols:alternate-email-rounded" class="w-5 h-5" />
                </span>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  class="input input-bordered w-full pl-7 bg-base-100 border focus:outline-[#10b981] active:outline-[#10b981] focus:border-none rounded-lg h-14"
                  :class="touched.email && errors.email ? 'border-red-500' : 'border-base-content/20'"
                >
              </div>
              <span v-if="touched.email && errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>
            <!-- Password -->
            <div class="flex flex-col gap-2">
              <label class="text-base-content text-sm font-medium">Password</label>
              <div class="relative">
                <span class="absolute left-2 top-[33px] -translate-y-1/2 text-base-content/40 z-10">
                  <Icon name="material-symbols:lock-outline-rounded" class="w-5 h-5" />
                </span>
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="••••••••"
                  class="input pl-7 input-bordered w-full bg-base-100 border focus:outline-[#10b981] active:outline-[#10b981] focus:border-none rounded-lg h-14"
                  :class="touched.password && errors.password ? 'border-red-500' : 'border-base-content/20'"
                >
              </div>
              <span v-if="touched.password && errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
            </div>
            <!-- Confirm Password -->
            <div class="flex flex-col gap-2">
              <label class="text-base-content text-sm font-medium">Confirm password</label>
              <div class="relative">
                <span class="absolute left-2 top-[33px] -translate-y-1/2 text-base-content/40 z-10">
                  <Icon name="material-symbols:lock-outline-rounded" class="w-5 h-5" />
                </span>
                <input
                  v-model="form.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  class="input pl-7 input-bordered w-full bg-base-100 border focus:outline-[#10b981] active:outline-[#10b981] focus:border-none rounded-lg h-14"
                  :class="touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-base-content/20'"
                >
              </div>
              <span v-if="touched.confirmPassword && errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
            </div>
            <button
              type="button"
              class="btn btn-success w-full rounded-lg h-14 text-neutral-content font-semibold mt-2 lg:text-xl"
              @click="handleSubmit"
            >
              Create an Account
            </button>
            <p class="text-center text-base-content/60 text-sm mt-2">
              Already have an account? <NuxtLink to="login" class="text-[#10b981] hover:underline font-medium">
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
        <p class="text-center text-base-content/60 text-sm mt-2">
          By signing in, you agree to our <a href="#" class="hover:underline font-medium">Terms</a> and <a href="#" class="hover:underline font-medium">Service</a>
        </p>
      </div>
    </div>
  </div>
</template>
