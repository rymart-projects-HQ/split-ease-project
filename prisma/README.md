# Prisma Setup Documentation

Database management for Split Ease using Prisma ORM with PostgreSQL (Supabase).

## Summary

This project uses **Prisma ORM v6.19.2** with **PostgreSQL** for database management. The setup includes a User model with basic authentication fields and automatic timestamp tracking.

## Installed Packages

**Dependencies:**

- `@prisma/client`: ^6.19.2

**DevDependencies:**

- `prisma`: ^6.19.2
- `pg`: ^8.17.0 (PostgreSQL driver)
- `@types/pg`: ^8.16.0

## Database Configuration

**Provider:** PostgreSQL (hosted on Supabase)

**Connection String:** Set in `.env` file

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

Get your connection string from Supabase:

1. Go to your Supabase project settings
2. Navigate to Database → Connection String
3. Copy the connection string (use "Transaction" pooler for Prisma)

## Current Schema

Located in [prisma/schema.prisma](./schema.prisma):

### User Model

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  avatarUrl String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users") // Maps to "users" table in database
}
```

**Fields:**

- `id` - UUID primary key (auto-generated)
- `email` - Unique email address
- `name` - Optional user name
- `avatarUrl` - Optional profile picture URL
- `createdAt` - Auto-generated creation timestamp
- `updatedAt` - Auto-updated modification timestamp

**Important:** The `id` field is a String UUID, not an auto-incrementing integer. This matches Supabase Auth's user ID format, allowing us to link auth users with application users.

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env` file in project root:

```env
DATABASE_URL="your_postgresql_connection_string"
DATABASE_NAME="your_database_name"
DATABASE_PASSWORD="your_database_password"
```

### 3. Generate Prisma Client

```bash
npm run prismagenerate
# or
npx prisma generate
```

**When to regenerate:**

- After modifying `schema.prisma`
- After pulling the project
- If you see TypeScript errors about Prisma types

### 4. Run Migrations

**Development:**

```bash
npx prisma migrate dev
```

**Production:**

```bash
npx prisma migrate deploy
```

## Migrations

Current migrations in [/migrations](./migrations/):

- `20260114235443_init` - Initial User model setup
- `20260205003113_user_table` - User table updates

## Common Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration (development)
npx prisma migrate dev --name description_of_changes

# Apply migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# Pull schema from existing database
npx prisma db pull

# Push schema without creating migration
npx prisma db push
```

## Integration with Nuxt

The Prisma Client is available in server-side code via a singleton instance.

### Usage in API Routes

```typescript
import { prisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  // Find all users
  const users = await prisma.user.findMany();

  // Find one user by email
  const user = await prisma.user.findUnique({
    where: { email: "test@example.com" }
  });

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      id: "uuid-from-supabase",
      email: "user@example.com",
      name: "John Doe"
    }
  });

  // Update a user
  const updated = await prisma.user.update({
    where: { id: "user-id" },
    data: { name: "New Name" }
  });

  // Delete a user
  await prisma.user.delete({
    where: { id: "user-id" }
  });

  return users;
});
```

### Prisma Client Singleton

Located at [server/utils/prisma.ts](../server/utils/prisma.ts)

```typescript
import { PrismaClient } from "@prisma/client";

// Global variable for development hot-reloading
let prismaGlobal: PrismaClient | undefined;

function prismaClientSingleton() {
  return new PrismaClient();
}

// Use existing client or create new one
export const prisma = prismaGlobal ?? prismaClientSingleton();

// In development, store client globally to prevent multiple instances
// eslint-disable-next-line node/no-process-env
if (process.env.NODE_ENV !== "production") {
  prismaGlobal = prisma;
}

export default prisma;
```

**Why a singleton?**

- Prevents creating multiple database connections
- Improves performance
- Follows Prisma best practices for serverless environments

## Database Architecture

Split Ease uses a **dual-database approach**:

### 1. Supabase Auth (`auth.users`)

- Managed internally by Supabase
- Stores authentication credentials
- Encrypted passwords, JWT tokens
- **Not directly accessible** via Prisma

### 2. Application Database (`public.users`)

- Managed by Prisma
- Your custom tables
- Links to auth via shared UUID

**User Signup Flow:**

```
1. Create auth user → supabase.auth.signUp()
   └─ Stores in auth.users (Supabase internal)

2. Create app user → prisma.user.create()
   └─ Stores in public.users (your table)
   └─ Uses same ID from step 1
```

See [server/api/auth/signup.post.ts](../server/api/auth/signup.post.ts) for implementation.

## Adding New Models

Example: Adding an Expense model

```prisma
model Expense {
  id          String   @id @default(uuid())
  description String
  amount      Int      // Store in cents
  date        DateTime @default(now())
  paidById    String
  paidBy      User     @relation(fields: [paidById], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("expenses")
}

// Update User model to include relation
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String?
  expenses  Expense[] // One user can have many expenses
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@map("users")
}
```

After adding/modifying models:

```bash
npx prisma migrate dev --name add_expense_model
```

## Troubleshooting

### "Prisma Client is not yet generated"

**Solution:**

```bash
npx prisma generate
```

### TypeScript errors after schema changes

**Solution:**

1. Stop dev server
2. Run `npx prisma generate`
3. Restart TypeScript server (VSCode: `Ctrl+Shift+P` → "TypeScript: Restart TS Server")
4. Restart dev server

### Migration conflicts

**Solution:**

```bash
# Reset database (development only)
npx prisma migrate reset

# Or manually resolve conflicts
npx prisma migrate resolve --applied <migration-name>
```

### Connection issues

**Check:**

1. DATABASE_URL is correct in `.env`
2. Database is accessible
3. Firewall rules allow connection
4. Connection string uses correct pooler (Transaction mode for Prisma)

## Best Practices

1. **Always migrate in development** - Use `migrate dev`, not `db push`
2. **Review migrations** - Check generated SQL before applying
3. **Use transactions** - For multiple related operations
4. **Index frequently queried fields** - Add `@@index` to schema
5. **Validate input** - Don't trust user input
6. **Handle errors** - Wrap database calls in try/catch
7. **Use select** - Only fetch fields you need

## Prisma Studio

Visual database editor:

```bash
npx prisma studio
```

Opens at `http://localhost:5555`

Features:

- Browse tables
- Edit records
- Run queries
- View relations

## Related Documentation

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Supabase with Prisma](https://supabase.com/docs/guides/integrations/prisma)
- [Main Project README](../README.md)
- [Server API Documentation](../server/README.md)
