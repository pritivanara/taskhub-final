import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://epeynsvfpanecencofgm.supabase.co"

const supabaseAnonKey = "sb_publishable_7Eoae-i2l4ZC5cqKabFglQ_C500aFC_"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)