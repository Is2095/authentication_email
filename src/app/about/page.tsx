"use client"

import { signIn, signOut, useSession } from 'next-auth/react';

function AboutPage() {

  const { data: session, status } = useSession();

  return (

    <div>AboutPage {session?.user?.name}</div>

  )

};

export default AboutPage;
