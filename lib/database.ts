// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 1. Get Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. Validate Configuration (Prevents silent failures)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local');
}

// 3. Create and Export Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);