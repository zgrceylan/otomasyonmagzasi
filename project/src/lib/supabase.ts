import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
if (!supabaseUrl || supabaseUrl === 'your_supabase_url' || !supabaseUrl.startsWith('https://')) {
  throw new Error('Please set VITE_SUPABASE_URL to your actual Supabase project URL in the .env file')
}

if (!supabaseKey || supabaseKey === 'your_supabase_anon_key') {
  throw new Error('Please set VITE_SUPABASE_ANON_KEY to your actual Supabase anon key in the .env file')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)