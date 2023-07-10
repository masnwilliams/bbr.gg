import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * ONLY FOR SERVER SIDE USE
 */
export const supabaseServer = createServerComponentClient({ cookies })
