
import { NextResponse } from "next/server";
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {

    const regexEmail = /^[a-z0-9._%+-]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    const { name, email, password } = await request.json();

    if (password.length < 6 || !password) return NextResponse.json({ message: 'El password debe tener más de 6 caracteres' }, { status: 400 });
    if (!email) return NextResponse.json({ message: 'Debe ingresar un email' }, { status: 400 });
    if (!regexEmail.test(email)) return NextResponse.json({ message: 'Debe ser un email' }, { status: 400 });
    if (name.length < 3 || name.length > 15) return NextResponse.json({ message: 'El nombre debe tener entre 3 y 15 caracteres' }, { status: 400 });

    try {

        await connectDB();
        const userFound = await User.findOne({ email });
        if (userFound) return NextResponse.json({ message: 'El email ingresado ya existe' }, { status: 400 });

        const passwordHashed = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            name,
            password: passwordHashed
        });

        const saveUser = await user.save();

        return NextResponse.json({
            _id: saveUser._id,
            email: saveUser.email,
            name: saveUser.fullname,
        });

    } catch (error) {

        if (error instanceof Error) {
            console.log(error);
            return NextResponse.json({ message: error.message }, { status: 405 });
        };

    };
};
