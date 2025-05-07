import { CMSLink } from '@/components/Link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import Image from 'next/image'
async function Page() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'articulos',
    pagination: false,
  })
  return (
    <div className="p-8 bg-white">
      <h1 className="text-5xl text-center font-semibold  text-[#00264d] ">Articulos</h1>
      <div className="grid  gap-16 grid-cols-1 lg:grid-cols-3 justify-between pt-8 ">
        {result.docs.map((a, i) => (
          <CMSLink
            key={i}
            type={'custom'}
            url={`/articulos/${a.slug}`}
            className=" flex-1 lg:aspect-square   text-[#00264d] "
          >
            <div className="p-2 flex flex-col justify-center gap-1">
              <Image
                src={
                  typeof a.heroImage === 'object'
                    ? a.heroImage?.url || ''
                    : a.heroImage?.toString() || ''
                }
                alt={a.meta?.title || ''}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
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
  )
}

export default Page
