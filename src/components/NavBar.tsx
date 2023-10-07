'use client'

import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

function NavBar() {

  const { data: session, status } = useSession();

  return (

    <nav className="bg-gradient-to-b from-cyan-50 to-cyan-200 pt-4">
      <div className="boder-1 border-black flex justify-between container mx-auto p-4">
        <Link href='/'>
          <h1 className="font-bold text-xl text-sky-600 hover:text-sky-900">
            NextAuth
          </h1>
        </Link>
        <ul className="flex gap-x-0">
          <li className="w-[13rem] flex items-center justify-center px-4 py-0 text-sky-700 hover:text-sky-900 hover:font-bold">
            <Link href='/resend'>Enviar Mail por Resend</Link>
          </li>
          <li className="w-[15.2rem] flex items-center justify-center px-4 py-0 text-sky-700 hover:text-sky-900 hover:font-bold">
            <Link href='/nodemailer'>Enviar Mail por Nodemailer</Link>
          </li>
          {/* <li className="w-[10.4rem] flex items-center justify-center px-4 py-0 text-sky-700 hover:text-sky-900 hover:font-bold">
            <Link href='/msg_Whatsapp'>Enviar WhatsApp</Link>
          </li> */}
        </ul>
        <ul className="flex gap-x-0">
          <li className="w-[5rem] flex items-center justify-center p-2">
            <Link href='/' className="text-sky-700 hover:text-sky-900 hover:font-bold">Inicio</Link>
          </li>
          <li className="w-28 flex items-center justify-center p-2">
            <Link href='/about' className="text-sky-700 hover:text-sky-900 hover:font-bold">Acerca de</Link>
          </li>
          <li className="w-[7rem] flex items-center justify-center p-2 b">
            {status === 'authenticated' ? (
              null
            ) : (
              <Link href='/register' className="text-sky-700 hover:text-sky-900 hover:font-bold">Registrarse</Link>
            )
            }
          </li>
          {status === 'authenticated' ? (
            <li className="w-20 flex items-center justify-center p-2">
              <button className="text-red-500 hover:text-red-700 hover:font-bold" onClick={async () => {
                await signOut({
                  callbackUrl: '/'
                })
              }} >Salir</button>
            </li>) :
            <li className="w-[6rem] flex items-center justify-center p-2">
              <Link href='/login' className="text-sky-700 hover:text-sky-900 hover:font-bold">Ingresar</Link>
            </li>
          }
          {
            status === 'authenticated' ? (
              !session?.user?.image ? (
                <div className="border border-black rounded-full p-0.5 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </div>
              ) : <img src={session?.user?.image || ''} alt=""
                className="w-10 h-10 rounded-full"
              />) : null
          }
          <li className="flex justify-center py-1 mx-2">
            <p className="text-sky-500">{session?.user?.name}</p>
          </li>
        </ul>
      </div>
    </nav>

  );

};

export default NavBar;
