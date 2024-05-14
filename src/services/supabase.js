
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://nszlpcylygwkqiurpfyj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zemxwY3lseWd3a3FpdXJwZnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MzU4NDksImV4cCI6MjAzMDIxMTg0OX0.RHbCqv4S0KLwYdYp4iRQQtWTgBQATWojIEK4hhCxzf0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase