// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This client is safe to run in the browser (it uses RLS/anon-key)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
