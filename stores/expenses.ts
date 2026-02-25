import { $fetch } from "ofetch";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type Expense = {
  id: string;
  description: string;
  amount: number; // in cents
  date: string;
  paidById: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
};

export type NewExpense = {
  description: string;
  amount: number;
  date?: string;
  paidById: string;
  groupId: string;
};

export const useExpensesStore = defineStore("expenses", () => {
  // State
  const expenses = ref<Expense[]>([]);
  const currentExpense = ref<Expense | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const expensesByGroup = computed(() => {
    return (groupId: string) => expenses.value.filter(e => e.groupId === groupId);
  });

  const totalAmount = computed(() => {
    return expenses.value.reduce((sum, expense) => sum + expense.amount, 0);
  });

  const expenseCount = computed(() => expenses.value.length);

  // Actions
  async function fetchExpenses(groupId?: string) {
    loading.value = true;
    error.value = null;

    try {
      const url = groupId ? `/api/expenses?groupId=${groupId}` : "/api/expenses";
      const { data } = await $fetch(url);
      expenses.value = data as Expense[];
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function fetchExpense(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/expenses/${id}`);
      currentExpense.value = data as Expense;
      return currentExpense.value;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function createExpense(expense: NewExpense) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch("/api/expenses", {
        method: "POST",
        body: expense,
      });

      const newExpense = data as Expense;
      expenses.value.push(newExpense);
      return newExpense;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function updateExpense(id: string, updates: Partial<NewExpense>) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/expenses/${id}`, {
        method: "PATCH",
        body: updates,
      });

      const updated = data as Expense;
      const index = expenses.value.findIndex(e => e.id === id);
      if (index !== -1) {
        expenses.value[index] = updated;
      }
      return updated;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function deleteExpense(id: string) {
    loading.value = true;
    error.value = null;

    try {
      await $fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });

      expenses.value = expenses.value.filter(e => e.id !== id);
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  function clearExpenses() {
    expenses.value = [];
    currentExpense.value = null;
  }

  function clearError() {
    error.value = null;
  }

  return {
    // State
    expenses: readonly(expenses),
    currentExpense: readonly(currentExpense),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    expensesByGroup,
    totalAmount,
    expenseCount,

    // Actions
    fetchExpenses,
    fetchExpense,
    createExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
    clearError,
  };
});
