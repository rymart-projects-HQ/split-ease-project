import { $fetch } from "ofetch";
import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export type Balance = {
  userId: string;
  userName: string;
  userEmail: string;
  balance: number; // positive = owed to them, negative = they owe
};

export type Settlement = {
  from: string; // userId
  to: string; // userId
  amount: number; // in cents
};

export type GroupBalance = {
  groupId: string;
  groupName: string;
  balances: Balance[];
  suggestedSettlements: Settlement[];
};

export const useBalancesStore = defineStore("balances", () => {
  // State
  const groupBalances = ref<Map<string, GroupBalance>>(new Map());
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getGroupBalance = computed(() => {
    return (groupId: string) => groupBalances.value.get(groupId);
  });

  const getUserBalance = computed(() => {
    return (groupId: string, userId: string) => {
      const groupBalance = groupBalances.value.get(groupId);
      if (!groupBalance)
        return null;
      return groupBalance.balances.find(b => b.userId === userId);
    };
  });

  const totalOwed = computed(() => {
    return (userId: string) => {
      let total = 0;
      groupBalances.value.forEach((groupBalance) => {
        const userBalance = groupBalance.balances.find(b => b.userId === userId);
        if (userBalance && userBalance.balance < 0) {
          total += Math.abs(userBalance.balance);
        }
      });
      return total;
    };
  });

  const totalOwedToUser = computed(() => {
    return (userId: string) => {
      let total = 0;
      groupBalances.value.forEach((groupBalance) => {
        const userBalance = groupBalance.balances.find(b => b.userId === userId);
        if (userBalance && userBalance.balance > 0) {
          total += userBalance.balance;
        }
      });
      return total;
    };
  });

  // Actions
  async function fetchGroupBalances(groupId: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/groups/${groupId}/balances`);
      const balance = data as GroupBalance;
      groupBalances.value.set(groupId, balance);
      return balance;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function fetchAllBalances() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch("/api/balances");
      const balances = data as GroupBalance[];
      balances.forEach((balance) => {
        groupBalances.value.set(balance.groupId, balance);
      });
      return balances;
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  async function settleBalance(groupId: string, settlement: Settlement) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(`/api/groups/${groupId}/settle`, {
        method: "POST",
        body: settlement,
      });

      const updated = data as GroupBalance;
      groupBalances.value.set(groupId, updated);
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

  function clearBalances() {
    groupBalances.value.clear();
  }

  function clearError() {
    error.value = null;
  }

  // Helper function to calculate simplified settlements
  function calculateSettlements(balances: Balance[]): Settlement[] {
    const settlements: Settlement[] = [];

    // Separate creditors (positive balance) and debtors (negative balance)
    const creditors = balances
      .filter(b => b.balance > 0)
      .map(b => ({ userId: b.userId, amount: b.balance }))
      .sort((a, b) => b.amount - a.amount);

    const debtors = balances
      .filter(b => b.balance < 0)
      .map(b => ({ userId: b.userId, amount: Math.abs(b.balance) }))
      .sort((a, b) => b.amount - a.amount);

    let i = 0;
    let j = 0;

    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];

      const settleAmount = Math.min(creditor.amount, debtor.amount);

      settlements.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: settleAmount,
      });

      creditor.amount -= settleAmount;
      debtor.amount -= settleAmount;

      if (creditor.amount === 0)
        i++;
      if (debtor.amount === 0)
        j++;
    }

    return settlements;
  }

  return {
    // State
    groupBalances: readonly(groupBalances),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    getGroupBalance,
    getUserBalance,
    totalOwed,
    totalOwedToUser,

    // Actions
    fetchGroupBalances,
    fetchAllBalances,
    settleBalance,
    clearBalances,
    clearError,

    // Helpers
    calculateSettlements,
  };
});
