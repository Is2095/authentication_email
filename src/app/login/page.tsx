"use client"

import { signIn } from "next-auth/react";
import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import ButtonGithub from "@/components/ButtonGithub";
import ButtonGoogle from "@/components/ButtonGoogle";

function LoginPage() {

  const router = useRouter();

  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setError('');

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    });

    if (res?.error) return setError(res.error);

    if (res?.ok) return router.push('/');

  };

  return (

    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 h-[22rem] w-3/10  rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-center">
          {error &&
            <div className="bg-red-500 text-white p-2 mb-2 rounded-sm">{error}</div>
          }
          <h1 className="text-4xl font-bold mb-4">Iniciar sesión</h1>
          <div className="flex gap-6 justify-center pb-4">
            <ButtonGithub />
            <ButtonGoogle />
          </div>
          <input type="email" placeholder="Correo electrónio" name="email" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <input type="password" placeholder="******" name="password" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <button className="w-32 bg-indigo-500 px-4 py-2 rounded-lg">Iniciar Sesión</button>
        </form>
      </div>
    </div>

  );

};

export default LoginPage;
