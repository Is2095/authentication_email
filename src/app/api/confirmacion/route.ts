
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';
import { connectDB } from "@/libs/mongodb";
import User from '@/models/user';

export async function POST(req: NextRequest, res: NextResponse) { //lleva el export para que lo pueda usar Next Js

  const { email, name } = await req.json();

  const pass = crypto.randomBytes(3).toString('hex');

  const datos = {
    email,
    name,
    cuerpo: `para confirmar el email ingresar en la aplicación el siguiente código ${pass}`,
    motivo: 'confirmación de email',
    remitente: process.env.CORREO_REMITENTE_CONFIRMACION,
    nameRemitente: 'Ismael'
  };

  try {

    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) return NextResponse.json({ message: 'El email ingresado ya existe' }, { status: 400 });

    const madarCorreoPass = await axios.post('http://localhost:3000/api/node_mailer', datos);

    return NextResponse.json({ pass }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ message: error }, { status: 400 });

  };

};
