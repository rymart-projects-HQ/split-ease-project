<!-- eslint-disable style/no-multiple-empty-lines, style/eol-last, no-console -->

# Stores Directory

Pinia state management stores for Split Ease. Centralized state management using Composition API setup pattern.

## Why Pinia?

Pinia provides:
- Type-safe state management with TypeScript
- Devtools integration for debugging
- Hot module replacement
- Composition API support
- No mutations (simpler than Vuex)
- Modular store architecture

## Current Stores

### [auth.ts](./auth.ts)

**Purpose:** Authentication state and user management

**State:**
- `user` - Current authenticated user
- `loading` - Loading state for auth operations
- `error` - Error messages from auth operations

**Getters:**
- `isAuthenticated` - Boolean indicating if user is logged in

**Actions:**
- `login(email, password)` - Sign in user
- `signup(email, password, name?)` - Register new user
- `logout()` - Sign out current user
- `fetchUser()` - Fetch current user from session
- `setUser(user)` - Set user manually
- `clearError()` - Clear error state

**Usage Example:**
```typescript
// In a component
const authStore = useAuthStore();

// Login
await authStore.login("user@example.com", "password123");

// Check auth status
// if (authStore.isAuthenticated) {
//   //console.log("User:", authStore.user);
// }

// Logout
await authStore.logout();
```

### [expenses.ts](./expenses.ts)

**Purpose:** Expense tracking and management

**State:**
- `expenses` - Array of all expenses
- `currentExpense` - Currently selected expense
- `loading` - Loading state
- `error` - Error messages

**Getters:**
- `expensesByGroup(groupId)` - Filter expenses by group
- `totalAmount` - Sum of all expense amounts
- `expenseCount` - Total number of expenses

**Actions:**
- `fetchExpenses(groupId?)` - Fetch all or group-specific expenses
- `fetchExpense(id)` - Fetch single expense
- `createExpense(expense)` - Create new expense
- `updateExpense(id, updates)` - Update existing expense
- `deleteExpense(id)` - Delete expense
- `clearExpenses()` - Clear all expenses from state
- `clearError()` - Clear error state

**Usage Example:**
```typescript
const expensesStore = useExpensesStore();

// Fetch group expenses
await expensesStore.fetchExpenses("group-123");

// Get filtered expenses
const groupExpenses = expensesStore.expensesByGroup("group-123");

// Create expense
await expensesStore.createExpense({
  description: "Dinner",
  amount: 5000, // $50.00 in cents
  paidById: "user-id",
  groupId: "group-123",
});
```

### [groups.ts](./groups.ts)

**Purpose:** Group management and member operations

**State:**
- `groups` - Array of all groups
- `currentGroup` - Currently selected group
- `loading` - Loading state
- `error` - Error messages

**Getters:**
- `groupCount` - Total number of groups
- `groupById(id)` - Find group by ID
- `userGroups(userId)` - Get groups where user is member or creator

**Actions:**
- `fetchGroups()` - Fetch all groups
- `fetchGroup(id)` - Fetch single group
- `createGroup(group)` - Create new group
- `updateGroup(id, updates)` - Update group details
- `deleteGroup(id)` - Delete group
- `addMember(groupId, userEmail)` - Add member to group
- `removeMember(groupId, userId)` - Remove member from group
- `clearGroups()` - Clear all groups from state
- `clearError()` - Clear error state

**Usage Example:**
```typescript
const groupsStore = useGroupsStore();

// Create a group
const newGroup = await groupsStore.createGroup({
  name: "Trip to Paris",
  description: "Summer vacation expenses",
  memberEmails: ["friend@example.com"],
});

// Add member
await groupsStore.addMember(newGroup.id, "another@example.com");

// Get user's groups
const myGroups = groupsStore.userGroups("my-user-id");
```

### [balances.ts](./balances.ts)

**Purpose:** Balance calculation and settlement management

**State:**
- `groupBalances` - Map of group balances (groupId -> GroupBalance)
- `loading` - Loading state
- `error` - Error messages

**Getters:**
- `getGroupBalance(groupId)` - Get balance for specific group
- `getUserBalance(groupId, userId)` - Get user's balance in group
- `totalOwed(userId)` - Total amount user owes across all groups
- `totalOwedToUser(userId)` - Total amount owed to user across all groups

**Actions:**
- `fetchGroupBalances(groupId)` - Fetch balances for specific group
- `fetchAllBalances()` - Fetch balances for all groups
- `settleBalance(groupId, settlement)` - Record a settlement payment
- `clearBalances()` - Clear all balances from state
- `clearError()` - Clear error state

**Helpers:**
- `calculateSettlements(balances)` - Calculate optimal settlement plan

**Usage Example:**
```typescript
const balancesStore = useBalancesStore();

// Fetch group balances
await balancesStore.fetchGroupBalances("group-123");

// Get balance info
const balance = balancesStore.getGroupBalance("group-123");
// console.log("Balances:", balance?.balances);
// console.log("Settlements:", balance?.suggestedSettlements);

// Settle a balance
await balancesStore.settleBalance("group-123", {
  from: "user-1",
  to: "user-2",
  amount: 2500, // $25.00
});
```

## Store Architecture

All stores follow the **Composition API setup pattern**:

```typescript
import { defineStore } from "pinia";

export const useMyStore = defineStore("storeName", () => {
  // State (use ref)
  const data = ref<Type[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters (use computed)
  const count = computed(() => data.value.length);

  // Actions (regular functions)
  async function fetchData() {
    loading.value = true;
    try {
      const result = await $fetch("/api/data");
      data.value = result.data;
    }
    catch (e: any) {
      error.value = e.message;
    }
    finally {
      loading.value = false;
    }
  }

  // Return everything
  return {
    // State (wrap in readonly for immutability)
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    count,

    // Actions
    fetchData,
  };
});
```

## Best Practices

### 1. Use Stores in Components

```typescript
// In a Vue component
const authStore = useAuthStore();
const expensesStore = useExpensesStore();

// Access state
// console.log(authStore.user);

// Access getters
// console.log(authStore.isAuthenticated);

// Call actions
await authStore.login(email, password);
```

### 2. Store State is Reactive

```vue
<script setup lang="ts">
const expensesStore = useExpensesStore();

// Automatically updates when store changes
</script>

<template>
  <div>
    <p v-if="expensesStore.loading">
      Loading...
    </p>
    <p v-else>
      Total: {{ expensesStore.expenseCount }}
    </p>
  </div>
</template>
```

### 3. Error Handling

```typescript
const groupsStore = useGroupsStore();

try {
  await groupsStore.createGroup(newGroup);
  // Success! Show success message
}
catch (error) {
  // Error already set in store
  console.error("Failed:", groupsStore.error);
  // Show error to user
}
```

### 4. Clearing State

```typescript
// On logout, clear all stores
const authStore = useAuthStore();
const expensesStore = useExpensesStore();
const groupsStore = useGroupsStore();
const balancesStore = useBalancesStore();

await authStore.logout();
expensesStore.clearExpenses();
groupsStore.clearGroups();
balancesStore.clearBalances();
```

### 5. Using Multiple Stores Together

```typescript
// Fetch related data
const groupsStore = useGroupsStore();
const expensesStore = useExpensesStore();

await groupsStore.fetchGroup(groupId);
await expensesStore.fetchExpenses(groupId);

// Now both stores have the data
// console.log(groupsStore.currentGroup);
// console.log(expensesStore.expenses);
```

## Common Patterns

### Loading States

```vue
<script setup lang="ts">
const store = useExpensesStore();
</script>

<template>
  <div>
    <div v-if="store.loading">
      Loading expenses...
    </div>
    <div v-else-if="store.error">
      Error: {{ store.error }}
    </div>
    <div v-else>
      <!-- Show data -->
    </div>
  </div>
</template>
```

### Form Submission

```vue
<script setup lang="ts">
const expensesStore = useExpensesStore();
const form = reactive({
  description: "",
  amount: 0,
  paidById: "",
  groupId: "",
});

async function handleSubmit() {
  try {
    await expensesStore.createExpense(form);
    // Reset form
    Object.assign(form, {
      description: "",
      amount: 0,
      paidById: "",
      groupId: "",
    });
  }
  catch (error) {
    // Error displayed via store.error
  }
}
</script>
```

### Computed Derived State

```typescript
// In a component
const expensesStore = useExpensesStore();
const groupId = ref("group-123");

// Automatically recomputes when expenses change
const groupExpenses = computed(() =>
  expensesStore.expensesByGroup(groupId.value),
);

const groupTotal = computed(() =>
  groupExpenses.value.reduce((sum, e) => sum + e.amount, 0),
);
```

## Store Communication

Stores can call other stores:

```typescript
// In balances.ts
import { useExpensesStore } from "./expenses";
import { useGroupsStore } from "./groups";

export const useBalancesStore = defineStore("balances", () => {
  async function recalculateBalances(groupId: string) {
    const expensesStore = useExpensesStore();
    const groupsStore = useGroupsStore();

    // Get data from other stores
    const expenses = expensesStore.expensesByGroup(groupId);
    const group = groupsStore.groupById(groupId);

    // Calculate balances...
  }

  return { recalculateBalances };
});
```

## Devtools

Pinia integrates with Vue Devtools:

1. Install [Vue Devtools](https://devtools.vuejs.org/)
2. Open devtools in browser
3. Navigate to "Pinia" tab
4. View state, getters, and actions
5. Time-travel debug state changes

## Testing Stores

```typescript
import { createPinia, setActivePinia } from "pinia";

import { useAuthStore } from "./auth";

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("logs in user", async () => {
    const store = useAuthStore();
    await store.login("test@example.com", "password");
    expect(store.isAuthenticated).toBe(true);
  });
});
```

## Type Safety

All stores are fully typed:

```typescript
// TypeScript knows the shape
const authStore = useAuthStore();
authStore.user?.email; // string | undefined
authStore.loading; // boolean
authStore.isAuthenticated; // boolean

// TypeScript catches errors
authStore.login("email"); // Error: missing password argument
```

## Performance Tips

1. **Use readonly() for state** - Prevents accidental mutations
2. **Avoid storing computed data** - Use getters instead
3. **Clear unused data** - Call clear methods when done
4. **Lazy load stores** - Only import when needed
5. **Use storeToRefs() for destructuring** - Maintains reactivity

```typescript
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

// Wrong - loses reactivity
const { user } = authStore;

// Correct - maintains reactivity
const { user } = storeToRefs(authStore);
```

## Adding New Stores

To create a new store:

1. Create file in `stores/` directory (e.g., `stores/settings.ts`)
2. Follow the Composition API pattern
3. Export types and store
4. Document in this README
5. Use in components via `useSettingsStore()`

Example template:

```typescript
import { defineStore } from "pinia";

export type MyType = {
  id: string;
  name: string;
};

export const useMyStore = defineStore("myStore", () => {
  // State
  const items = ref<MyType[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const itemCount = computed(() => items.value.length);

  // Actions
  async function fetchItems() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await $fetch("/api/items");
      items.value = data as MyType[];
    }
    catch (e: any) {
      error.value = e.message;
      throw e;
    }
    finally {
      loading.value = false;
    }
  }

  return {
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),
    itemCount,
    fetchItems,
  };
});
```

## Related Documentation

- [Pinia Documentation](https://pinia.vuejs.org/)
- [Composition API](https://vuejs.org/api/composition-api-setup.html)
- [Nuxt Pinia Module](https://nuxt.com/modules/pinia)
- [Main Project README](../README.md)
- [API Documentation](../server/README.md)