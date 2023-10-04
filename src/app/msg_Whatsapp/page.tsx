/*"use client"

import { useRouter } from "next/navigation"
import axios from 'axios'
import { validationSchemaWhatsapp } from '@/utils/validate'
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik'
import { useSession } from "next-auth/react"

type TypeData = {
    numero: string
    name: string
    mensaje: string
}
function WhatsappPage() {

    const router = useRouter()
    const { data: session, status } = useSession()

    const initialValues = {
        numero: '',
        name: '',
        mensaje: '',
    }
    const onSubmit = async (values: TypeData, onSubmitProps: FormikHelpers<TypeData>) => {
       
        
        const res = await axios.post('/api/whatsapp_Msg', { ...values, nameRemitente: session?.user?.name })
       // onSubmitProps.resetForm()
    }

    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
            <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 w-3/10  rounded-lg">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchemaWhatsapp}
                >

                    {(formik: FormikProps<TypeData>) => {
                        return (
                            <Form className="flex flex-col justify-end items-start">
                                <div className="w-full flex justify-center">
                                    <h1 className="pb-2 text-3xl font-bold text-sky-700">Whatsapp</h1>
                                </div>

                                <h1 className="text-4xl font-bold mb-4">
                                    Ingrese los datos:
                                </h1>
                                <div className='w-full h-20'>
                                    <Field
                                        type="text"
                                        name='numero'
                                        placeholder=" Número del destinatario: "
                                        className="w-full mt-3 p-1 bg-transparent border-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                    />
                                    <ErrorMessage name='numero' component='div' className='text-red-600 text-xs font-bold' />
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

                                <div className='w-full h-40'>
                                    <Field as='textarea'
                                        name='mensaje'
                                        placeholder=' Mensaje:'
                                        cols={50}
                                        rows={4}
                                        className="w-full mt-3 p-1 bg-transparent border-2  border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                    />
                                    <ErrorMessage name='mensaje' component='div' className='text-red-600 text-xs font-bold' />
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
        </div>
    )
}

export default WhatsappPage
*/