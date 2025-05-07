import { CMSLink } from '@/components/Link'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Inicio } from '@/payload-types'
import RichText from '@/components/RichText'
import Link from 'next/link'
export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'articulos',
    limit: 3,
    pagination: false,
  })
  const inicio: Inicio = await getCachedGlobal('inicio', 1)()

  return (
    <>
      <div className="bg-[#00264D] text-[#FEFCF3] pb-16">
        <div className="container text-5xl mt-4 leading-none ">
          <h1 className=" text-center">Justicia-Paz-Desarrollo</h1>
          <p className="text-2xl text-center tracking-wider mt-4 font-extralight">
            Analisis y Consejo legal especializado
          </p>
        </div>
      </div>
      <div className="container flex-col xl:flex-row pt-6  xl:px-24 text-[#00264D] text-xl mt-4 leading-none flex">
        <div className="flex ">
          <span className="text-[#00264d] font-semibold tracking-wider text-8xl pb-2 inline-block">
            {inicio['about-me'].charAt(0)}
          </span>
          <p className="mt-2 tracking-wide leading-normal">{inicio['about-me'].slice(1)}</p>
        </div>
        <div className="xl:flex-col uppercase mt-6 xl:mt-0 flex gap-4 xl:w-max justify-evenly xl:pl-20">
          <Link
            prefetch
            href="/articulos"
            className="flex justify-center items-center border-[#00264d] uppercase w-full xl:w-64 text-[#00264d]  px-4 py-2 border-2"
          >
            Leer Articulos
          </Link>
          <div className="xl:hidden h-12 w-[2px] bg-[#00264d]" />
          <Link
            prefetch
            href="/contacto"
            className="border-[#00264d] uppercase w-full items-center justify-center flex xl:w-64 text-[#FEFCF3]  px-4 py-2 border-2 bg-[#00264d]"
          >
            Agendar una consulta
          </Link>
        </div>
      </div>
      <div className="container pb-8">
        <div className="bg-[#e0c46422] text-[#00264d] p-8 rounded-lg my-12 ">
          <p className="text-2xl font-bold flex flex-col italic gap-4">
            <span className="text-[#00264d] font-light italic">{inicio.quote}</span>
            <span>— Javier Celiz</span>
          </p>
        </div>

        <h2 className="text-3xl text-center font-semibold  text-[#00264d] ">Articulos</h2>
        <div className="grid  gap-16 grid-cols-1 lg:grid-cols-3 justify-between pt-8 ">
          {result.docs.map((a, i) => (
            <CMSLink
              key={i}
              type={'custom'}
              url={`/articulos/${a.slug}`}
              className="overflow-hidden flex-1 lg:aspect-square   text-[#00264d] "
            >
              <div className="h-[1px] w-full bg-[#00264d] mb-4" />
              <div className="p-2 flex flex-col justify-center gap-1">
                <span className="font-normal text-2xl tracking-wide uppercase pr-2">{a.title}</span>
                <span className="text-zinc-700">Apr 10, 2023</span>
                <div className="text-sm ">
                  <RichText data={a.summary} className="mx-0 px-0" />
                </div>
              </div>
            </CMSLink>
          ))}
        </div>
      </div>
    </>
  )
}
