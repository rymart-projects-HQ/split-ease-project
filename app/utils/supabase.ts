/* eslint-disable node/no-process-env */
import { createClient } from "@supabase/supabase-js";

export const serverSupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
