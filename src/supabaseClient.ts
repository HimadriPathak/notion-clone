import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseApiKey || !supabaseUrl) {
  throw new Error("Missing Supabase API Key or URL");
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);
