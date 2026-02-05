# Prisma Setup Documentation

## Summary

This project uses Prisma ORM v6.19.2 with PostgreSQL for database management. The setup includes a User model with basic authentication fields and automatic timestamp tracking.

## Installed Packages

**Dependencies:**

- `@prisma/client`: ^6.19.2

**DevDependencies:**

- `prisma`: ^6.19.2
- `pg`: ^8.17.0 (PostgreSQL driver)
- `@types/pg`: ^8.16.0

## Database Configuration

**Provider:** PostgreSQL

**Connection String:** Set in `.env` file

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

## Current Schema

Located in `prisma/schema.prisma`:

**User Model:**

- `id` - Auto-incrementing integer (Primary Key)
- `email` - Unique string
- `name` - Optional string
- `createdAt` - Auto-generated timestamp
- `updatedAt` - Auto-updated timestamp

## Setup Steps

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure database:**
   - Create `.env` file in project root
   - Add `DATABASE_URL` with your PostgreSQL connection string

3. **Run existing migrations:**

   ```bash
   npx prisma migrate deploy
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

## Migrations

**Current Migration:** `20260114235443_init` - Initial User model setup

## Common Commands

```bash
# Generate Prisma Client (via npm script)
npm run prismagenerate

# Or directly with npx
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

## Integration with Nuxt

The Prisma Client is configured as a singleton in `server/utils/prisma.ts`:

- Auto-imported in server routes
- Development-safe global caching (prevents multiple instances during hot reload)

Usage in API routes:

```typescript
// prisma is auto-imported from server/utils/prisma.ts
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();
  return users;
});
```
