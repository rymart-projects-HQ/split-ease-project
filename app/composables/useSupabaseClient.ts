import { createClient } from "@supabase/supabase-js";

export function useSupabaseClient() {
  const config = useRuntimeConfig();

  return createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseAnonKey as string,
  );
}
