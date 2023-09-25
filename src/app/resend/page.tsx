"use client"

import { FormEvent, useState } from 'react'
import { useRouter } from "next/navigation"
import axios from 'axios'
import { validationSchema } from '@/utils/validate'
import { useFormik, FormikHandlers, Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik'

type TypeData = {
    email: string
    name: string
    motivo: string
    cuerpo: string
}
// const validate = (values: TypeData) => {
//     ValidateForm.validate(values)
//     .then(() => console.log(values, 'datos'))
//     .catch((error) => console.log({error}, '**********')
//     )
// }
function ResendPage() {

    const router = useRouter()

    const initialValues = {
        email: '',
        name: '',
        motivo: '',
        cuerpo: ''
    }
    const onSubmit = async (values: TypeData, onSubmitProps: FormikHelpers<TypeData>) => {
        const res = await axios.post('/api/send', values)
        onSubmitProps.resetForm()
        console.log('res del axios: ->', res.data);
    }
    const formik = useFormik<TypeData>({
        // initialValues: {
        //     email: '',
        //     name: '',
        //     motivo: '',
        //     cuerpo: ''
        // },
        initialValues,
        onSubmit,
        validationSchema
    })

    // console.log('formik data: ', formik.values);
    // console.log('formid errors: ', formik.errors);


    const [error, setError] = useState('')
    /*const [data, setData] = useState<TypeData>({
        email: '',
        name: '',
        motivo: '',
        cuerpo: ''
    })

    const ingresoDatosCorreo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        ValidateForm.validate(data)
            .then(() => console.log(data, 'datos'))
            .catch((error) => console.log(error.message, 'error'))

        
    }*/
    //     const formData = new FormData(e.currentTarget)

    //     const data = {
    //         email: formData.get('email'),
    //         name: formData.get('name'),
    //         motivo: formData.get('motivo'),
    //         cuerpo: formData.get('cuerpo') 
    //     }

    //     console.log(typeof data.name, '--', e.target.value);


    //     // const res = await axios.post('/api/send', {
    //     //     email: formData.get('email'),
    //     //     name: formData.get('name'),
    //     //     motivo: formData.get('motivo'),
    //     //     cuerpo: formData.get('cuerpo')
    //     // })


    //     setError('')

    //}
    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
            <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 w-3/10  rounded-lg">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >

                    {(formik: FormikProps<TypeData>) => {
                        return (
                            <Form className="flex flex-col justify-end items-start">
                                <h1 className="text-4xl font-bold mb-4">
                                    Ingrese los datos:
                                </h1>
                                <div className='w-full h-20'>
                                    <Field
                                        type="text"
                                        name='email'
                                        placeholder=" Email del destinatario: "
                                        // {...formik.getFieldProps('email')}
                                        className="w-full mt-3 p-1 bg-transparent border-2 border-gray-400 duration-200 focus:border-gray-700 text-black placeholder-gray-500 outline-none"
                                    />
                                    <ErrorMessage name='email' component='div' className='text-red-600 text-xs font-bold' />
                                    {/* {
                            formik.touched.email && formik.errors.email
                                ? <div className='text-red-600 text-xs font-bold'>{formik.errors.email}</div>
                                : null
                        } */}
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
        </div>
    )
}

export default ResendPage