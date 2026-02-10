# Utils Directory

Frontend utility functions for Split Ease.

## Purpose

Utility functions are helper functions that perform common tasks across the application. They're automatically imported by Nuxt.

## Current Files

- `supabase.ts` - Supabase client utilities

## Example Utilities

### Format Utilities

```typescript
// utils/format.ts
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount / 100); // Amount in cents
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0)
    return "Today";
  if (days === 1)
    return "Yesterday";
  if (days < 7)
    return rtf.format(-days, "day");
  return formatDate(date);
}
```

### Validation Utilities

```typescript
// utils/validation.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}
```

### Constants

```typescript
// utils/constants.ts
export const APP_NAME = "Split Ease";
export const DEFAULT_CURRENCY = "USD";
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Accommodation",
  "Entertainment",
  "Shopping",
  "Other"
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
```

### Array Utilities

```typescript
// utils/array.ts
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const k = item[key];
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  });
}
```

## Usage

Utils are auto-imported in components:

```vue
<script setup lang="ts">
// No import needed!
const amount = 1050; // $10.50 in cents
const formatted = formatCurrency(amount); // "$10.50"

const email = "user@example.com";
const isValid = isValidEmail(email); // true
</script>

<template>
  <div>
    <p>Amount: {{ formatCurrency(amount) }}</p>
    <p>Date: {{ formatDate(new Date()) }}</p>
  </div>
</template>
```

## Best Practices

1. **Pure functions** - No side effects, same input = same output
2. **Single responsibility** - Each function does one thing well
3. **Type safety** - Use TypeScript for all parameters and returns
4. **Documentation** - Add JSDoc comments for complex functions
5. **Testing** - Write unit tests for utility functions
6. **Naming** - Use clear, descriptive names (verb + noun)

## Testing Utilities

```typescript
// utils/test-helpers.ts
export function createMockUser(overrides = {}) {
  return {
    id: "1",
    email: "test@example.com",
    name: "Test User",
    ...overrides
  };
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Related Documentation

- [JavaScript Utility Libraries](https://lodash.com/)
- [Nuxt Utils Directory](https://nuxt.com/docs/guide/directory-structure/utils)
- [Main App README](../README.md)
