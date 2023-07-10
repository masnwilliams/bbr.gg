'use client'

/**
 * This is an integration provider for easily working with Supabase Auth.
 */
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  OAuthResponse,
  Session,
  SignInWithOAuthCredentials,
  SupabaseClient,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SUPABASE_COOKIE } from './shared'

type MutateSessionContext = {
  signUpWithPassword(credentials: PasswordCredentials): Promise<AuthResponse>
  signInWithPassword(credentials: PasswordCredentials): Promise<AuthResponse>
  signOut: () => Promise<void>
  updateUser(attributes: UserAttributes): Promise<UserResponse>
  signInWithProvider(
    credentials: SignInWithOAuthCredentials
  ): Promise<OAuthResponse>
}

export type SessionContext = MutateSessionContext &
  (
    | {
        isLoading: false
        session: Session
        error: null
        supabaseClient: SupabaseClient
      }
    | {
        isLoading: true
        session: null
        error: null
        supabaseClient: SupabaseClient
      }
    | {
        isLoading: false
        session: null
        error: AuthError
        supabaseClient: SupabaseClient
      }
    | {
        isLoading: false
        session: null
        error: null
        supabaseClient: SupabaseClient
      }
  )

const SessionContext = createContext<SessionContext>({
  isLoading: true,
  session: null,
  error: null,
  supabaseClient: {} as any,
  signInWithPassword: {} as any,
  signOut: {} as any,
  signUpWithPassword: {} as any,
  signInWithProvider: {} as any,
  updateUser: {} as any,
})

export interface SessionContextProviderProps {
  supabaseClient: SupabaseClient
  initialSession?: Session | null
  onAuthStateChange?: (
    event: AuthChangeEvent,
    session: Session | null
  ) => Promise<void> | void
}

/**
 * Session Provider for Supabase Auth integration.
 */
export const SessionProvider = ({
  supabaseClient,
  initialSession = null,
  children,
  onAuthStateChange,
}: PropsWithChildren<SessionContextProviderProps>) => {
  const [session, setSession] = useState<Session | null>(initialSession)
  const [isLoading, setIsLoading] = useState<boolean>(!initialSession)
  const [error, setError] = useState<AuthError>()

  useEffect(() => {
    let mounted = true

    const getSession = async () => {
      const querySession = await supabaseClient.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (querySession.error) {
          setError(querySession.error)
          setIsLoading(false)
          return
        }

        setSession(querySession.data.session)
        setIsLoading(false)
      }
    }

    getSession()
  }, [])

  useEffect(() => {
    /**
     * @see https://supabase.com/docs/guides/auth/server-side-rendering#bringing-it-together
     */
    const authSubscription = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        // Handle custom onAuthState change event
        if (onAuthStateChange) {
          await onAuthStateChange(event, session)
        }

        // if (session && event === 'USER_UPDATED') {
        //   setSession(session)
        // }

        if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          setSession(session)

          //   Set cookie client-side
          const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
          document.cookie = `${SUPABASE_COOKIE.AccessToken}=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
          document.cookie = `${SUPABASE_COOKIE.RefreshToken}=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        }

        if (event === 'SIGNED_OUT') {
          setSession(null)
          //   Set cookie client-side
          //   delete cookies on sign out
          const expires = new Date(0).toUTCString()
          document.cookie = `${SUPABASE_COOKIE.AccessToken}=; path=/; expires=${expires}; SameSite=Lax; secure`
          document.cookie = `${SUPABASE_COOKIE.RefreshToken}=; path=/; expires=${expires}; SameSite=Lax; secure`
        }
      }
    )

    // Unsubscribe from auth listener on cleanup
    return () => {
      authSubscription.data.subscription.unsubscribe()
    }
  }, [])

  const signUpWithPassword = async (credentials: PasswordCredentials) => {
    return await supabaseClient.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    })
  }

  const signInWithPassword = async (credentials: PasswordCredentials) => {
    return await supabaseClient.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })
  }

  /**
   * @see https://supabase.com/docs/reference/javascript/auth-signinwithoauth
   */
  const signInWithProvider = async (
    credentials: SignInWithOAuthCredentials
  ) => {
    return await supabaseClient.auth.signInWithOAuth(credentials)
  }

  const signOut = async () => {
    await supabaseClient.auth.signOut()
  }

  const updateUser = async (attributes: UserAttributes) => {
    return await supabaseClient.auth.updateUser(attributes)
  }

  const value: SessionContext = useMemo(() => {
    if (isLoading) {
      return {
        isLoading: true,
        session: null,
        error: null,
        supabaseClient,
        signUpWithPassword,
        signInWithPassword,
        signInWithProvider,
        updateUser,
        signOut,
      }
    }

    if (error) {
      return {
        isLoading: false,
        session: null,
        error,
        supabaseClient,
        signUpWithPassword,
        signInWithPassword,
        signInWithProvider,
        updateUser,
        signOut,
      }
    }

    return {
      isLoading: false,
      session,
      error: null,
      supabaseClient,
      signUpWithPassword,
      signInWithPassword,
      signInWithProvider,
      updateUser,
      signOut,
    }
  }, [isLoading, session, error])

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

/**
 * Get full session context.
 *
 * - `useSession` hook returns `context.session`
 * - `useUser` hook returns `context.session.user`
 */
export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(
      `useSessionContext must be used within a SessionContextProvider.`
    )
  }

  return context
}

/**
 * Get full session context with session user brought to top level.
 */
export const useAuth = () => {
  const sessionContext = useSessionContext()
  return {
    ...sessionContext,
    user: sessionContext.session?.user,
  }
}

/**
 * Wrapper function to get `context.session` from session context.
 */
export const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useSession must be used within a SessionContextProvider.`)
  }

  return context.session
}

/**
 * Hook to get onAuthStateChange function for `SessionProvider`
 */
export const useOnAuthStateChange = (
  func: (event: AuthChangeEvent, session: Session | null) => Promise<void>
) => {
  return {
    onAuthStateChange: (event: AuthChangeEvent, session: Session | null) =>
      func(event, session),
  }
}

/**
 * Wrapper function to get `context.session.user` from session context.
 */
export const useUser = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a SessionContextProvider.`)
  }

  return context.session?.user ?? null
}

type PasswordCredentials = { email: string; password: string }

/**
 * Handles updating the user’s cookie through an API call.
 */
// const updateSupabaseCookie = async (
//   event: AuthChangeEvent,
//   session: Session | null
// ) => {
//   // Sends a POST request to update the user's cookie
//   await fetch(`/api/v2/auth/supabase`, {
//     method: 'POST',
//     headers: new Headers({ 'Content-Type': 'application/json' }),
//     credentials: 'same-origin',
//     body: JSON.stringify({ event, session }),
//   })
// }
