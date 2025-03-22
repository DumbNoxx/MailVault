import dotenv from "dotenv";
dotenv.config()
import { createClient } from '@supabase/supabase-js';

const supabaseUrl:  undefined | string = process.env.SUPABASE_URL; 
const supabaseKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey){
  throw new Error('Supabase URL or Anon Key is not defined in environment variables.')
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;