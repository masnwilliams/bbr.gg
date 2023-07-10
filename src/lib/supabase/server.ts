import { createClient, Session, User } from '@supabase/supabase-js'
import { SUPABASE_COOKIE } from './shared'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * ONLY FOR SERVER SIDE USE
 */
export const supabaseServer = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
)

type ObjectWithCookies = {
  cookies: Partial<{
    [key: string]: string
  }>
}

/**
 * Get user by reading the cookie from the request.
 *
 * This cookie is set by `SessionContext.tsx` on login.
 */
export const getSupabaseUserByCookie = async (
  req: ObjectWithCookies
): Promise<
  | {
      data: { user: null; session: null }
      error: { code: string; message: string }
    }
  | { data: { user: User; session: Session } }
> => {
  const refreshToken = req.cookies[SUPABASE_COOKIE.RefreshToken]
  const accessToken = req.cookies[SUPABASE_COOKIE.AccessToken]

  if (refreshToken && accessToken) {
    const session = await supabaseServer.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    })

    if (session.error || !session.data.user || !session.data.session) {
      return {
        data: { user: null, session: null },
        error: {
          code: 'UNAUTHENTICATED',
          message: 'User is not authenticated',
        },
      }
    } else {
      return {
        data: { user: session.data.user, session: session.data.session },
      }
    }
  } else {
    return {
      data: { user: null, session: null },
      error: {
        code: 'UNAUTHENTICATED',
        message: 'User is not authenticated',
      },
    }
  }
}

/**
 * Wraps `supabaseServer.auth.api.generateLink` to pull the `action_link` param in a discriminated union.
 *
 * Server-use only.
 */
export const getActionLink = async (
  ...props: Parameters<typeof supabaseServer.auth.admin.generateLink>
): Promise<
  { success: false; error: string } | { success: true; action_link: string }
> => {
  const res = await supabaseServer.auth.admin.generateLink(...props)
  if (
    res.error ||
    !res.data ||
    !('action_link' in res.data) ||
    !res.data.user.action_link
  ) {
    // console.log({ error: res.error })
    return {
      success: false,
      error: 'failed to generate action link',
    }
  } else {
    return {
      success: true,
      action_link: res.data.user.action_link,
    }
  }
}
