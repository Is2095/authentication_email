"use client"

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import ButtonGithub from "@/components/ButtonGithub";
import ButtonGoogle from "@/components/ButtonGoogle";
import Swal from "sweetalert2";
import { ConfirmacionCorreo } from "@/components/confirmacionCorreo";

interface DatosConfirmacion {
  email: string
  name: string
};

export const validacionLogin = ({ password, email, fullname }: { password: string, email: string, fullname: string }): { email: string, password: string, fullname: string } => {

  const regexEmail = /^[a-z0-9._%+-]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  let error = {
    password: '',
    email: '',
    fullname: ''
  }

  if (password.length < 6 || !password) error.password = 'El password debe tener más de 6 caracteres';
  if (!email) error.email = 'Debe ingresar un email';
  if (!regexEmail.test(email)) error.email = 'Debe ser un email';
  if (fullname.length < 3 || fullname.length > 20) error.fullname = 'El nombre debe tener entre 3 y 20 caracteres';

  return error;

};

function RegisterPage() {

  const router = useRouter();

  const [error, setError] = useState<{
    email: string;
    password: string;
    fullname: string;
  }>({
    email: '',
    password: '',
    fullname: ''
  }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullname = formData.get('fullname') as string;

    setError(validacionLogin({ password, email, fullname }));

    const datosConfirmacion: DatosConfirmacion = {
      email,
      name: fullname,
    };

    // envío de mail por nodemailer para confirmar email

    try {

      if (validacionLogin({ password, email, fullname }).password === '' && validacionLogin({ password, email, fullname }).email === '' && validacionLogin({ password, email, fullname }).fullname === '') {

        const confirmacion = await ConfirmacionCorreo(datosConfirmacion);

        if (confirmacion) {

          const res = await axios.post('/api/auth/signup', {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('fullname')
          });

          if (res.statusText) {
            Swal.fire({
              title: `Bienvenido: ${datosConfirmacion.name}`,
              text: 'Te has registrado exitosamente',
              timer: 3000,
              showConfirmButton: false
            });
            return router.push('/');

          } else {

            await Swal.fire({
              icon: 'error',
              title: 'Algo salió mal!!!',
              text: 'No se pudo completar la operación'
            });
            return router.push('/');

          }

        } else {

          await Swal.fire({
            icon: 'error',
            title: 'Algo salió mal!!!',
            text: 'No se pudo completar la operación'
          });
          return router.push('/');

        };
      }
      //esto hace el logueo con las credenciales (formulario de registro) ingresadas
      // const resNextAuth = await signIn('credentials', {
      //   email: res.data.email,
      //   password: formData.get('password'),
      //   redirect: false
      // })
      // if (res.status) {
      //   Swal.fire('Bienvenido, te has registado y logeado correctamente')
      //   return router.push('/dashboard')}

    } catch (error) {

      if (error instanceof AxiosError)
        setError({ email: error.response?.data.message, password: '', fullname: '' });
      console.log(error);

    };

  };

  return (
    <div className="justify-center h-[calc(100vh-12rem)] flex flex-col items-center">
      <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 h-[26rem] w-3/10 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col justify-end items-center">
          {error.email &&
            <div className="bg-red-500 text-white p-2 mb-2 rounded-sm">{error.email}</div>
          }
          {error.password &&
            <div className="bg-red-500 text-white p-2 mb-2 rounded-sm">{error.password}</div>
          }
          {error.fullname &&
            <div className="bg-red-500 text-white p-2 mb-2 rounded-sm">{error.fullname}</div>
          }
          <h1 className="text-4xl font-bold mb-7">Crea tu cuenta</h1>
          <div className="flex gap-6 justify-center pb-4">
            <ButtonGithub />
            <ButtonGoogle />
          </div>
          <input type="text" placeholder="Nombre completo" name="fullname" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <input type="text" placeholder="Correo electrónio" name="email" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <input type="password" placeholder="******" name="password" className="bg-cyan-300 px-4 py-2 block mb-2 w-full rounded-md focus:outline-0" />
          <button className="bg-indigo-500 px-4 py-2 rounded-lg">Registrarse</button>
        </form>
      </div>
    </div>
  );

};

export default RegisterPage;
