import { serverSupabaseClient } from "~/utils/supabase";

import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  // Get token from Authorization header
  const token = getHeader(event, "authorization")?.replace("Bearer ", "");

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "No token provided",
    });
  }

  try {
    // Step 1: Verify JWT token with Supabase
    const { data: { user }, error: authError } = await serverSupabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw createError({
        statusCode: 401,
        message: "Invalid or expired token",
      });
    }

    // Step 2: Get profile from YOUR users table
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      throw createError({
        statusCode: 404,
        message: "Profile not found",
      });
    }

    // Step 3: Return complete profile
    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.avatarUrl,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
  catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to get user profile",
    });
  }
});
