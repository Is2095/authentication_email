
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from '@/models/user';
import bcrypt from 'bcryptjs';

const handler = NextAuth({

  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }
  }),

  GithubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRECT as string,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }
  }),

  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'text', placeholder: 'email' },
      password: { label: 'Password', type: 'password', placeholder: '*********' }
    },
    async authorize(credentials, req) { //credentials son los datos tipiados y req info adicional de la petición cabecera, kukis

      await connectDB();
      const userFound = await User.findOne({ email: credentials?.email }).select("+password");
      if (!userFound) throw new Error("Usuario no existe");

      const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

      if (!passwordMatch) throw new Error('invalidas las credenciales');

      return userFound;
    },

  })],

  callbacks: {
    jwt({ user, account, token, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
});

export { handler as GET, handler as POST }; // es como voy a recibir peticiones get y post
