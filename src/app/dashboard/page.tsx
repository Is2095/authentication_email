"use client"

import { useSession } from "next-auth/react"

function DashhoardPage() {
    const {data: session, status} = useSession()
    console.log(session, status, '///////////////////////////');
    
  return (
    <div>DashhoardPage</div>
  )
}

export default DashhoardPage