// src/lib/supabaseClient.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

if (typeof window !== "undefined") {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

// Export either the client (in the browser) or null (on the server)
export { supabaseClient };
