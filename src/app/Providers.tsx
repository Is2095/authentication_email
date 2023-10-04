'use client'

// se realiza este componente ya que es de frontend y así en el archivo no es necesario ponerlo como "use client"
import { SessionProvider } from 'next-auth/react';

export function Providers({children}: {children: React.ReactNode}) {

  return (

    <SessionProvider>
      {children}
    </SessionProvider>

  );

};
