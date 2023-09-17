"use client"

import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from 'react'
import { useRouter } from "next/navigation"
import ButtonGithub from "@/components/ButtonGithub"
import ButtonGoogle from "@/components/ButtonGoogle"

function RegisterPage() {

  const router = useRouter()

  const [error, setError] = useState('')
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // const email = formData.get('email')
    // const password = formData.get('password')
    // const fullname = formData.get('fullname')

    try {
      setError('')
      const res = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('fullname')
      })

      //esto hace el logueo con las credenciales (formulario de registro) ingresadas
      const resNextAuth = await signIn('credentials', {
        email: res.data.email,
        password: formData.get('password'),
        redirect: false
      })
      if (resNextAuth?.ok) return router.push('/dashboard')
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
      console.log(error);
    }
  }

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 h-[26rem] w-3/10 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-center">
          {error &&
            <div className="bg-red-500 text-white p-2 mb-2 rounded-sm">{error}</div>
          }
          <h1 className="text-4xl font-bold mb-7">Crea tu cuenta</h1>
          <div className="flex gap-6 justify-center pb-4">
            <ButtonGithub />
            <ButtonGoogle />
          </div>
          <input type="text" placeholder="Nombre completo" name="fullname" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <input type="email" placeholder="Correo electrónio" name="email" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <input type="password" placeholder="******" name="password" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <button className="bg-indigo-500 px-4 py-2 rounded-lg">Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
