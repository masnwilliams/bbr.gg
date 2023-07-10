'use client'

import { useAuth } from 'lib/supabase/SessionContext'
import { DiscordIcon } from 'components/Icons'
import { useState } from 'react'

const AuthPanel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const res = await auth.signInWithProvider({
        provider: 'discord',
        options: {
          redirectTo: '/auth',
        },
      })

      if (res.error) {
        setIsLoading(false)
        alert(res.error.message)

        return
      }
    } catch (err) {
      setIsLoading(false)
      alert('There was an error signing you up. Sorry!')
      // console.error(err)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {auth.session ? (
          <button
            onClick={async () => await auth.signOut()}
            className="flex m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div className={'flex  justify-between px-3 gap-x-4'}>
              {isLoading ? <div>Loading...</div> : <div>Sign out</div>}
            </div>
          </button>
        ) : (
          <button
            onClick={async () => await handleSubmit()}
            className="flex m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div className={'flex  justify-between px-3 gap-x-4'}>
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <DiscordIcon width={24} height={24} />
                  <div>Login with Discord</div>
                </>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthPanel
