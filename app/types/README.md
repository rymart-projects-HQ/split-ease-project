# Types

TypeScript interfaces for frontend.

## Why separate from server types?

- Client-side specific types (UI state, form data)
- Imports don't pull in server-only code
- Clear separation of concerns

## Files

- `user.ts` - User interface
- `group.ts` - Group, GroupMember interfaces
- `expense.ts` - Expense, ExpenseSplit interfaces
