import { serverSupabaseClient } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    // Get the access token from the Authorization header
    const authHeader = getHeader(event, "authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "No session found",
      });
    }

    // Sign out the user
    const { error } = await serverSupabaseClient.auth.admin.signOut(token);

    if (error)
      throw error;

    return {
      success: true,
      message: "Logged out successfully",
    };
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Logout failed",
    });
  }
});
