import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRole) {
  throw new Error('Missing Supabase credentials in environment variables');
}

// Client for regular users
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin operations (service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

export default supabase;
