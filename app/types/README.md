# Types Directory

TypeScript type definitions specific to the frontend application.

## Purpose

This directory contains client-side type definitions that are separate from server types to avoid accidentally importing server-only code into the client bundle.

## Why Separate from Server Types?

- Client-side specific types (UI state, form data)
- Imports don't pull in server-only code
- Clear separation of concerns
- Prevents bundling server dependencies in client code

## Current Files

- `user.ts` - User interface definitions
- `group.ts` - Group, GroupMember interfaces
- `expense.ts` - Expense, ExpenseSplit interfaces

## Guidelines

### What Goes Here

- UI state types
- Form data interfaces
- Component prop types (if complex)
- Client-side API response types
- Frontend-specific utility types

### What Doesn't Go Here

- Server-side types (use `/server/types/`)
- Database models (use Prisma generated types)
- Shared types between client/server (use `/types/` in root if needed)

## Example Types

```typescript
// types/forms.ts
export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  name?: string;
  confirmPassword: string;
} & LoginFormData;

// types/ui.ts
export type ToastNotification = {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
};

export type ModalState = {
  isOpen: boolean;
  title?: string;
  content?: string;
};

// types/expense.ts (client-side representation)
export type ExpenseListItem = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: Date;
  splitWith: string[];
};
```

## Usage

Types are auto-imported by Nuxt:

```vue
<script setup lang="ts">
// No import needed!
const formData = ref<LoginFormData>({
  email: "",
  password: ""
});

function handleSubmit(data: LoginFormData) {
  // Type-safe form handling
}
</script>
```

## Type Organization Best Practices

1. **One file per domain** - Group related types together
2. **Export all types** - Make them available for auto-import
3. **Use interfaces for objects** - Better error messages
4. **Use type for unions/primitives** - `type Status = 'active' | 'inactive'`
5. **Document complex types** - Add JSDoc comments

## Example: Well-Documented Type

```typescript
/**
 * Represents an expense in the Split Ease application
 * Used in expense lists and detail views
 */
export type Expense = {
  /** Unique identifier (UUID from database) */
  id: string;

  /** Brief description of the expense */
  description: string;

  /** Amount in cents (e.g., 1050 = $10.50) */
  amount: number;

  /** User ID who paid for this expense */
  paidBy: string;

  /** ISO 8601 date string */
  createdAt: string;

  /** List of user IDs sharing this expense */
  splitWith: string[];
};
```

## Related Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vue TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Main App README](../README.md)
