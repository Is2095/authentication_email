'use client'

import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'

function NavBar() {

  const { data: session, status } = useSession()
  console.log(session, '*******************', status);
   // {/* <nav className="bg-gradient-to-b from-cyan-50 to-cyan-200 mt-2"> */}

  return (
    <nav className="boder-1 border-green-900 bg-gradient-to-b from-cyan-50 to-cyan-200 mt-2">
      {/* <div className="w-10  bg-red-500 flex justify-between container mx-auto p-8">
salir
      </div> */}
      
   
      <div className="boder-1 border-black flex justify-between container mx-auto p-4">
        <Link href='/'>
          <h1 className="font-bold text-xl text-sky-600 hover:text-sky-900">
            NextAuth
          </h1>
        </Link>
        <ul className="flex gap-x-2">
          <li className="w-20 flex justify-center py-1">
            <Link href='/dashboard' className="text-sky-700 hover:text-sky-900 hover:font-bold">Inicio</Link>
          </li>
          <li className="w-20 flex justify-center py-1">
            <Link href='/about' className="text-sky-700 hover:text-sky-900 hover:font-bold">About</Link>
          </li>
          {status === 'authenticated' ? (
            <li className="w-20 flex justify-center pb-2">
              <button className="text-sky-700 hover:text-sky-900 hover:font-bold" onClick={async () => {
                await signOut({
                  callbackUrl: '/'
                })
              }} >Salir</button>
            </li>) :
            <li className="w-20 flex justify-center py-1">
              <Link href='/login' className="text-sky-700 hover:text-sky-900 hover:font-bold">Ingresar</Link>
            </li>
          }
          <li className="w-24 flex justify-center py-1">
            <Link href='/register' className="text-sky-700 hover:text-sky-900 hover:font-bold">Registrarse</Link>
          </li>
          
          {
            status === 'authenticated' ? (
              !session?.user?.image ? ( 
                <div className="border border-black rounded-full p-0.5 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </div>
              ) : <img src={session?.user?.image || ''} alt=""
                className="w-10 h-10 rounded-full cursor-pointer"
              />) : null
          }
          <li className="flex justify-center py-1">
            <p className="text-sky-500">{session?.user?.name}</p>
          </li>
        </ul>
      </div>
    </nav>


    //   <nav className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-4">
    //     <div className="flex justify-between container mx-auto">
    //       <Link href='/' className="text-sky-600 hover:text-sky-900">
    //         Home
    //       </Link>
    //       <Link href='/register' className="bg-sky-300 text-sky-700 hover:text-sky-900 px-3 py-2 rounded">
    //         Registrarse
    //       </Link>
    //       {status === 'authenticated' ? (
    //         <div className="flex gap-x-2 items-center">
    //           <Link href='/dashboard' className="text-sky-600 hover:text-sky-900">
    //             Mandar Email
    //           </Link>
    // <p>{session?.user?.name} dfgsdfgsdfgsdf {session?.user?.name}</p>
    // {
    //   !session.user?.image ? (
    //     <div className="border border-black rounded-full">
    //       <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
    //         <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    //       </svg>
    //     </div>
    //   ) : <img src={session?.user?.image || ''} alt=""
    //     className="w-10 h-10 rounded-full cursor-pointer"
    //   />
    // }

    //           <button onClick={async () => {
    //             await signOut({
    //               callbackUrl: '/'
    //             })
    //           }}
    //             className="bg-sky-300 text-sky-700 hover:text-sky-900 px-3 py-2 rounded">
    //             Logout
    //           </button>
    //         </div>
    //       ) : (
    //         <button onClick={() => signIn()} className="bg-sky-300 text-sky-700 hover:text-sky-900 px-3 py-2 rounded">
    //           SignIn
    //         </button>
    //       )

    //       }
    //     </div>
    //   </nav>
  )
}

export default NavBar