"use client"

import { useRouter } from "next/navigation";
import axios from 'axios';
import { validationSchema } from '@/utils/validate';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';
import { useEffect } from "react";

type TypeData = {
    email: string
    name: string
    motivo: string
    cuerpo: string
};

async function NodemailerPage() {

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        (async () => {
            if (status === 'unauthenticated') {
                const login = await Swal.fire({
                    title: 'Debes iniciar sesión',
                    showConfirmButton: true
                })
                if (login.isConfirmed) {
                    return router.push('/login')
                }
            }
        })()
    }, [])


    const initialValues = {
        email: '',
        name: '',
        motivo: '',
        cuerpo: '',
    };

    const onSubmit = async (values: TypeData, onSubmitProps: FormikHelpers<TypeData>) => {

        const res = await axios.post('/api/node_mailer', { ...values, remitente: session?.user?.email, nameRemitente: session?.user?.name });

        if (res.statusText === 'OK') {
            Swal.fire({
                title: 'Correo enviado',
                timer: 2000,
                showConfirmButton: false,
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: 'Error en el envio',
                icon: 'error'
            })
        }

        onSubmitProps.resetForm();

    }

    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
            {status === 'authenticated' &&
                <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 w-3/10  rounded-lg">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >

                        {(formik: FormikProps<TypeData>) => {
                            return (
                                <Form className="flex flex-col justify-end items-start">
                                    <div className="w-full flex justify-center">
                                        <h1 className="pb-2 text-3xl font-bold text-sky-700">Nodemailer</h1>
                                    </div>

                                    <h1 className="text-4xl font-bold mb-4">
                                        Ingrese los datos:
                                    </h1>
                                    <div className='w-full h-20'>
                                        <Field
                                            type="text"
                                            name='email'
                                            placeholder=" Email del destinatario: "
                                            className="w-full mt-3 p-1 bg-transparent border-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                        />
                                        <ErrorMessage name='email' component='div' className='text-red-600 text-xs font-bold' />
                                    </div>

                                    <div className='w-full h-20'>
                                        <Field
                                            type="text"
                                            name='name'
                                            placeholder=" Nombre del destinatario: "
                                            className="w-full mt-3 p-1 bg-transparent border-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                        />
                                        <ErrorMessage name='name' component='div' className='text-red-600 text-xs font-bold' />
                                    </div>

                                    <div className='w-full h-20'>
                                        <Field
                                            type="text"
                                            name='motivo'
                                            placeholder=" Motivo: "
                                            className="w-full mt-3 p-1 bg-transparent border-2 border-s-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                        />
                                        <ErrorMessage name='motivo' component='div' className='text-red-600 text-xs font-bold' />
                                    </div>

                                    <div className='w-full h-40'>
                                        <Field as='textarea'
                                            name='cuerpo'
                                            placeholder=' Mensaje:'
                                            cols={50}
                                            rows={4}
                                            className="w-full mt-3 p-1 bg-transparent border-2  border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                        />
                                        <ErrorMessage name='cuerpo' component='div' className='text-red-600 text-xs font-bold' />
                                    </div>

                                    <div className='w-full flex justify-center'>
                                        <button type='submit' className="w-32 text-2xl font-bold bg-indigo-800 px-4 py-2 rounded-lg cursor-pointer disabled:text-indigo-700" disabled={!formik.isValid} >Enviar</button>
                                    </div>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </div>
            }
        </div>
    );

};

export default NodemailerPage;
