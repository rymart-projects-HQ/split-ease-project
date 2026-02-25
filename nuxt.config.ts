/* eslint-disable node/no-process-env */
import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxtjs/color-mode", "nuxt-api-shield", "@pinia/nuxt"],
  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    // Private (server-only, never sent to browser)
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

    // Public (safe to expose to browser)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  css: ["~/assets/css/main.css"],
  colorMode: {
    dataValue: "theme",
  },
  nuxtApiShield: {
    limit: {
      max: 100,
      duration: 60,
      ban: 900,
    },
    delayOnBan: true,
    errorMessage: "Too Many Requests",
    retryAfterHeader: true,
    routes: [
      {
        path: "/api/auth/login",
        max: 5, // 15 minutes
        duration: 10,
      },
      {
        path: "/api/auth/signup",
        max: 5, // 15 minutes
        duration: 10,
      },
      {
        path: "/api/auth/me",
        max: 5, // 15 minutes
        duration: 10,
      },
      {
        path: "/api/auth/logout",
        max: 5, // 15 minutes
        duration: 10,
      },
      {
        path: "/api/test-supabase",
        max: 5, // 15 minutes
        duration: 10,
      },
    ],
  },
});
