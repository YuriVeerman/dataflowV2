/**
 * Supabase Client Initialization
 * Sets up the connection to the Supabase backend using environment variables.
 */

// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase project configuration from environment variables.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Shared Supabase client instance.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
