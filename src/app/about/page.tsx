"use client"
import { signIn, signOut, useSession } from 'next-auth/react'

function AboutPage() {
    const {data: session, status} = useSession()
    console.log(session, '-----', status);
    
  return (
    <div>AboutPage</div>
  )
}

export default AboutPage