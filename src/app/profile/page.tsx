import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const supabaseServer = createServerComponentClient({ cookies })

  const user = await supabaseServer.auth.getUser()

  return <div>{user.data.user?.email}</div>
}

export default ProfilePage
