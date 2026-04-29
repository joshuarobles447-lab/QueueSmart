import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fiptchcbhharnzoodcsz.supabase.co';
const supabaseAnonKey = 'sb_publishable_g61sWXQu-BZNmV61BEGymQ_V9w91yJR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
