export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard"] } // después de dashboard se coloca ", y se colocan todas las rutas protegidas que querramos