import { CONFIG } from 'src/global-config'
import { createClient } from '@supabase/supabase-js'

// ----------------------------------------------------------------------

const isSupabase = CONFIG.auth.method === 'supabase'

const supabaseUrl = CONFIG.supabase.url
const supabaseKey = CONFIG.supabase.key

// ----------------------------------------------------------------------

export const supabase = isSupabase ? createClient(supabaseUrl, supabaseKey) : {}
