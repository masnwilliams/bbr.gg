import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

/**
 * ONLY FOR CLIENT SIDE USE
 */
export const supabaseClient = createClientComponentClient()
