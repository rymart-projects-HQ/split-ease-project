import { serverSupabaseClient } from "~/utils/supabase";

export default defineEventHandler(async (_event) => {
  try {
    const { data, error } = await serverSupabaseClient.auth.admin.listUsers();

    if (error)
      throw error;

    return {
      success: true,
      message: "Supabase connection working!",
      userCount: data.users.length,
      users: data.users,
    };
  }
  catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
});
