
export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/dashboard/:path*', '/email', '/whatsapp'] // después de dashboard se coloca ", y se colocan todas las rutas protegidas que querramos
    // y :path* proteje todo lo que está dentro de dashboard también
};
