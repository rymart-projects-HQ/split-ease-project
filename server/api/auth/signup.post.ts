import { serverSupabaseClient } from "~/utils/supabase";

import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  // Get email/password from request body
  const { email, password, name } = await readBody(event);

  // Validate input
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  try {
    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await serverSupabaseClient.auth.signUp({
      email,
      password,
    });

    if (authError)
      throw authError;
    if (!authData.user)
      throw new Error("User creation failed");

    // Step 2: Create user profile in YOUR users table
    const user = await prisma.user.create({
      data: {
        id: authData.user.id, // Use same ID from Supabase Auth
        email: authData.user.email!,
        name: name || null,
      },
    });

    // Step 3: Return user data (session is handled by Supabase)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Signup failed",
    });
  }
});
