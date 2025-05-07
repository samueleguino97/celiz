import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import { getClientSideURL } from '@/utilities/getURL'
import Image from 'next/image'
import { Articulo } from '@/payload-types'

export const PostHero: React.FC<{
  post: Articulo
}> = ({ post }) => {
  const { heroImage, publishedAt, title } = post

  const url = typeof heroImage === 'object' ? heroImage?.url : heroImage

  const cacheTag = typeof heroImage === 'object' ? heroImage?.updatedAt : null
  const src = `${getClientSideURL()}${url}?${cacheTag}`
  return (
    <div className="relative  text-[#00264d] pb-16">
      <div className="container text-center z-10 relative ">
        <h1 className="text-6xl font-light">{title}</h1>

        <div className="flex flex-col mt-4">
          {publishedAt && (
            <div className="flex flex-row gap-1 font-light justify-center">
              Dr. Javier Celiz -- <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            </div>
          )}
        </div>
        <div className="max-w-[48rem] mx-auto mt-8">
          <Image
            src={src}
            alt={title}
            width={1200}
            height={600}
            className="w-full  h-64 object-cover"
          />
        </div>
      </div>
    </div>
  )
}
