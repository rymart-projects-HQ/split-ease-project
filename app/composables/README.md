# Composables Directory

Vue 3 composables for shared reactive logic and business logic in Split Ease.

## What are Composables?

Composables are reusable functions that encapsulate stateful logic using Vue's Composition API. They allow you to share logic across components without prop drilling or complex state management.

## Auto-import

All composables in this directory are automatically imported by Nuxt. Use them directly in components without imports!

## Current Composables

### [useSupabaseClient.ts](./useSupabaseClient.ts)

Creates and returns a Supabase client instance for database and auth operations.

**Purpose**: Provides a configured Supabase client for frontend use.

**Usage**:

```vue
<script setup lang="ts">
const supabase = useSupabaseClient();

// Query data
const { data, error } = await supabase
  .from("expenses")
  .select("*");

// Auth operations
const { data: authData } = await supabase.auth.signIn({
  email: "user@example.com",
  password: "password"
});
</script>
```

**Returns**: Configured Supabase client with your project URL and anon key

**Related**: See [server/utils/supabase.ts](../../server/utils/supabase.ts) for server-side client

## Creating New Composables

### Example: useExpenses

```typescript
// composables/useExpenses.ts
export function useExpenses() {
  const supabase = useSupabaseClient();
  const expenses = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchExpenses(groupId: string) {
    loading.value = true;
    try {
      const { data, error: err } = await supabase
        .from("expenses")
        .select("*")
        .eq("group_id", groupId);

      if (err)
        throw err;
      expenses.value = data;
    }
    catch (e) {
      error.value = e;
    }
    finally {
      loading.value = false;
    }
  }

  async function createExpense(expense: Expense) {
    const { data, error: err } = await supabase
      .from("expenses")
      .insert(expense);

    if (err)
      throw err;
    return data;
  }

  return {
    expenses: readonly(expenses),
    loading: readonly(loading),
    error: readonly(error),
    fetchExpenses,
    createExpense
  };
}
```

Usage:

```vue
<script setup lang="ts">
const { expenses, loading, fetchExpenses } = useExpenses();

onMounted(() => {
  fetchExpenses("group-id-123");
});
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else>
    <div v-for="expense in expenses" :key="expense.id">
      {{ expense.description }}
    </div>
  </div>
</template>
```

## Composable Best Practices

1. **Naming Convention**: Always prefix with `use` (e.g., `useAuth`, `useGroups`)
2. **Return Objects**: Return an object with properties and methods
3. **TypeScript**: Use proper type definitions
4. **Readonly State**: Export readonly refs when state shouldn't be mutated directly
5. **Error Handling**: Include error states and handle exceptions
6. **Loading States**: Provide loading indicators for async operations

## Common Patterns

### State Management Pattern

```typescript
export function useFeature() {
  const state = ref(initialState);
  const loading = ref(false);
  const error = ref(null);

  async function action() {
    loading.value = true;
    error.value = null;
    try {
      // Do something
      state.value = newState;
    }
    catch (e) {
      error.value = e;
    }
    finally {
      loading.value = false;
    }
  }

  return {
    state: readonly(state),
    loading: readonly(loading),
    error: readonly(error),
    action
  };
}
```

### Lifecycle Management Pattern

```typescript
export function useFeature() {
  const data = ref(null);

  onMounted(() => {
    // Initialize
  });

  onUnmounted(() => {
    // Cleanup
  });

  return { data };
}
```

### Computed Properties Pattern

```typescript
export function useCalculations(expenses: Ref<Expense[]>) {
  const total = computed(() =>
    expenses.value.reduce((sum, exp) => sum + exp.amount, 0)
  );

  const average = computed(() =>
    expenses.value.length ? total.value / expenses.value.length : 0
  );

  return { total, average };
}
```

## Future Composables

Planned composables for Split Ease:

- `useAuth()` - Authentication state and methods
- `useExpenses()` - Expense CRUD operations
- `useGroups()` - Group management
- `useBalances()` - Balance calculations
- `useSettlements()` - Settlement recommendations

## TypeScript Support

Define proper types for composables:

```typescript
type UseExpensesReturn = {
  expenses: Readonly<Ref<Expense[]>>;
  loading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<Error | null>>;
  fetchExpenses: (groupId: string) => Promise<void>;
  createExpense: (expense: NewExpense) => Promise<Expense>;
};

export function useExpenses(): UseExpensesReturn {
  // Implementation
}
```

## Related Documentation

- [Vue Composables Guide](https://vuejs.org/guide/reusability/composables.html)
- [Nuxt Composables Directory](https://nuxt.com/docs/guide/directory-structure/composables)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [Main App README](../README.md)
