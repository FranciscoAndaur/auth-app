import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://weekuqkapvwbvnlavohw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZWt1cWthcHZ3YnZubGF2b2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NjUzNTAsImV4cCI6MjA0NzU0MTM1MH0.IwxBP2Qu5aqOjMRjB6kt8S4cIJnyTjD-DPQ4OgBbuVw'


const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }