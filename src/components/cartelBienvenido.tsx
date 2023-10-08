"use client"

import { useSession } from "next-auth/react"

export const CartelBienvenido = () => {
    
    const { data: session, status } = useSession()

    return (

        <div>

            {
                status === 'authenticated' && <h1 className="text-6xl font-serif text-sky-800 tracking-widest">Bienvenido: {session.user?.name}</h1>
            }

            {
                status === 'unauthenticated' && <h1 className="text-8xl font-serif text-sky-800 tracking-widest">Bienvenidos !!</h1>
            }

        </div>

    );

};
