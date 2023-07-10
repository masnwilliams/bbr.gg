'use client'

import { supabaseClient } from 'lib/supabase/client'
import { SessionProvider } from 'lib/supabase/SessionContext'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <SessionProvider
      supabaseClient={supabaseClient}
      onAuthStateChange={async (event) => {
        // Automatically navigates to /auth when user signs out
        if (event === 'SIGNED_OUT') {
          await router.replace('/auth')
        }
      }}
    >
      {children}
    </SessionProvider>
  )
}
