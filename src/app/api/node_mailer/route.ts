
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) { //lleva el export para que lo pueda usar Next Js

  const { email, name, cuerpo, motivo, remitente, nameRemitente } = await req.json();

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NODEMAILER_USER,
      pass: process.env.EMAIL_NODEMAILER_PASS
    }
  });

  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('¡El servidor está listo para recibir nuestros mensajes!');
    }
  });

  try {

    const info = await transport.sendMail({
      from: `${nameRemitente}  <${remitente}>`,
      to: email,
      subject: motivo,
      html: `<div><h1>Hola: ${name} </h1> <p>${cuerpo}</p> </div>`
    });

    return NextResponse.json({ info, message: 'correo enviado' }, { status: 200 });

  } catch (error) {

    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });

  };

};
