import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error.message)
  throw new Error(error.message)
}

// Example query helper
export const fetchData = async (tableName, query = {}) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select()
      .match(query)

    if (error) {
      handleSupabaseError(error)
    }

    return data
  } catch (error) {
    handleSupabaseError(error)
  }
} 