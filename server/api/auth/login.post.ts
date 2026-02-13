import { serverSupabaseClient } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
  // Get email/password from request body
  const { email, password } = await readBody(event);

  // Validate input
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  try {
    // Supabase validates credentials and returns session
    const { data, error } = await serverSupabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error)
      throw error;
    if (!data.user)
      throw new Error("Login failed");

    // Return user and session
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: data.session,
    };
  }
  catch (error: any) {
    throw createError({
      statusCode: 401,
      message: error.message || "Invalid credentials",
    });
  }
});
