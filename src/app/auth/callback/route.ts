import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This is the route that the user is redirected to after signing in
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  // If there is a code in the URL, exchange it for a session
  if (code) {
    const supabaseRoute = createRouteHandlerClient({ cookies })
    await supabaseRoute.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/profile`)
}
