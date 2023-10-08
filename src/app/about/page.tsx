"use client"

import { useSession } from 'next-auth/react';

function AboutPage() {

  const { data: session, status } = useSession();

  return (

    <div className="justify-top h-[calc(100vh-12rem)]  flex flex-col items-center ">

      <div className='flex pt-10'>
        <h1 className='px-3 text-[2rem] text-sky-800'>
          Hola:
        </h1>
        <h2 className='px-3 text-[2rem] text-sky-800'>
          soy Ismael, un DESARROLLADOR WEB en continuo creciemiento.
        </h2>
      </div>

      <div className='flex flex-col w-[70%] p-5 text-[1rem]'>
        <p className='py-2 indent-10'>
          En ésta oportunidad les traigo esta aplicación, la cual podés registrarte por medio de "google", "github", y con credenciales o email. En este último caso, se enviará un correo al email ingresado con un código que se deberá ingresar en la aplicación para validar el email y poder finalizar el registro.
        </p>
        <p className='py-2 indent-10'>
          Una vez registrado, se deberá ingresar los datos para logearse y así poder tener acceso a los dos métodos disponibles para mandar correos, Resend y Nodemailer.
        </p>
        <p className='py-2 indent-10'>
          En cualquiera de los métodos aparece un formulario controlados con validaciones varias. Al llenarlo con los datos requeridos y correspondientes se habilitará el botón de enviar.
        </p>
        <p className='py-2 indent-10'>
          Deberas apretar el botón "enviar" para enviar el correo.
        </p>
        <p className='py-2 indent-10'>
          Por último, cabe aclarar que en ésta aplicación no maneja los mensajes rebotes, por lo que no puede comprobar si el email ingresado existe.
        </p>
        <p className='py-2 indent-10'>
          A disfrutar de la aplicación y del código!!!!!!!!!!!!!!!
        </p>
      </div>

    </div>

  );

};

export default AboutPage;
