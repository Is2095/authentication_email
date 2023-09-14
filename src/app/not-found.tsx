import Link from "next/link"

function Notfound() {
  return (
    <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold m-1">Ups!!!! Se produjo un error</h1>
            <Link href='/' className="text-slate-400 mt-15 cursor-pointer hover:text-slate-900 bg-blue-200 rounded p-1">
                Vover al inicio
            </Link>
        </div>
    </section>
  )
}

export default Notfound