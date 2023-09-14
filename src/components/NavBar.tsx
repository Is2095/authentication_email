'use client'

import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'

function NavBar() {

  const { data: session, status } = useSession()

  return (
    <section className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex items-center justify-between px-24">
      <Link href='/' className="text-sky-600 hover:text-sky-900">
        Home
      </Link>
      {status === 'authenticated' ? (
        <div className="flex gap-x-2 items-center">
          <Link href='/dashboard' className="text-sky-600 hover:text-sky-900">
            Dashboard
          </Link>
          <p>{session?.user?.name} {session?.user?.email}</p>
          <img src={session?.user?.image || ''} alt=""
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <button onClick={async () => {
            await signOut({
              callbackUrl: '/'
            })
          }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => signIn()} className="bg-sky-300 text-sky-700 hover:text-sky-900 px-3 py-2 rounded">
          Sign In
        </button>
      )

      }

    </section>
  )
}

export default NavBar