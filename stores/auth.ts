import { $fetch } from "ofetch";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type User = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userEmail = computed(() => user.value?.email);
  const userName = computed(() => user.value?.name);

  // Actions
  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (response.success && response.user) {
        user.value = response.user as User;
      }
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function signup(email: string, password: string, name?: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/auth/signup", {
        method: "POST",
        body: { email, password, name },
      });

      if (response.success && response.user) {
        user.value = response.user as User;
      }
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    error.value = null;

    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      user.value = null;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function fetchUser() {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/auth/user");
      user.value = response.user as User;
    }
    catch (e: any) {
      error.value = e.message;
      user.value = null;
    }
    finally {
      loading.value = false;
    }
  }

  function setUser(newUser: User | null) {
    user.value = newUser;
  }

  function clearError() {
    error.value = null;
  }

  return {
    // State
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    isAuthenticated,
    userEmail,
    userName,

    // Actions
    login,
    signup,
    logout,
    fetchUser,
    setUser,
    clearError,
  };
});
