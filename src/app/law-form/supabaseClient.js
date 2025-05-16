import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sgffsqchyrdshewplwbn.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZmZzcWNoeXJkc2hld3Bsd2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NzYzNTAsImV4cCI6MjAyNjI1MjM1MH0.TdjeVYEqXfuYDbCRRX2N94nvxb8B5HQz_C_4QWsQC5g' // 請到 Supabase 專案設定複製 anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
