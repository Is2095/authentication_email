
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.API_KEY_RESEND);

export async function POST(req: Request) { //lleva el export para que lo pueda usar Next Js

    const { email, name, cuerpo, motivo } = await req.json();
    
    try {

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: motivo,
            react: EmailTemplate({ firstName: name, cuerpo }),
            text: ''
        });
        return NextResponse.json({data, message: 'correo enviado' }, { status: 200 });

    } catch (error) {

        console.log(error);      
        return NextResponse.json({ message: error }, { status: 400 });

    };

};
