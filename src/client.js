import { createClient } from '@supabase/supabase-js'
const URL = 'https://lzhmhzbjjajltcmtrnsd.supabase.co'
const API_KEY = 'sb_publishable_ut-SDplHDPHtiYQnzrqLQw_wBlhefw6'
export const supabase = createClient(URL, API_KEY)