export default defineEventHandler(async () => {
  try {
    // 'prisma' is auto-imported from server/utils/db.ts
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    };
  }
  catch (error) {
    return {
      status: "error",
      database: "failed",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
