# Server Directory

Nuxt server-side code including API routes, middleware, and utilities.

## Directory Structure

```
server/
├── api/           # API endpoints
├── middleware/    # Server middleware
├── plugins/       # Server plugins
├── routes/        # Additional route handlers
├── types/         # Server-specific TypeScript types
└── utils/         # Server utilities
```

## API Endpoints

### Health Check

- **GET /api/health** - Database connectivity check
  - Returns: `{ status, database, timestamp }` on success
  - Returns: `{ status, database, message }` on error

## Utilities

### Prisma Client (`utils/prisma.ts`)

Singleton Prisma client with development caching to prevent multiple instances during hot reload:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = globalThis.prismaGlobal ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prismaGlobal = prisma;
// }

export default prisma;
```

The `prisma` client is auto-imported throughout server code.

## Adding New Endpoints

Create files in `api/` directory following Nuxt convention:

- `api/users.get.ts` → `GET /api/users`
- `api/users.post.ts` → `POST /api/users`
- `api/users/[id].get.ts` → `GET /api/users/:id`

Example endpoint:

```typescript
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();
  return users;
});
```
