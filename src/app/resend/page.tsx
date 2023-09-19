"use client"

import { FormEvent, useState } from 'react'
import { useRouter } from "next/navigation"
import axios from 'axios'

function ResendPage() {

    const router = useRouter()

    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const res = await axios.post('/api/send', {
            email: formData.get('email'),
            name: formData.get('name'),
            motivo: formData.get('motivo'),
            cuerpo: formData.get('cuerpo')
        })

        setError('')

    }
    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
            <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 w-3/10  rounded-lg">
                <form onSubmit={handleSubmit} className="flex flex-col justify-end items-center">
                    <h1 className="text-4xl font-bold mb-4">Ingrese los datos:</h1>

                    <input type="email" placeholder="Correo destino:" name="email" className="w-full my-3 py-2 bg-transparent border-b-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none" />

                    <input type="text" placeholder="Nombre del destinatario:" name="name" className="w-full my-3 py-2 bg-transparent border-b-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none" />

                    <input type="text" placeholder="Motivo:" name="motivo" className="w-full my-3 py-2 bg-transparent border-b-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"/>

                    <textarea  placeholder='Mensaje:' name='cuerpo' cols={50} rows={8} className="w-full my-3 py-2 bg-transparent border-b-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"/>

                    <button className="w-32 bg-indigo-500 my-3 px-4 py-2 rounded-lg">Enviar Email</button>
                </form>
            </div>
        </div>
    )
}

export default ResendPage