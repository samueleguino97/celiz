import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Estudio Juridico - Celiz',
  images: [
    {
      url: `${getServerSideURL()}/logo.png`,
    },
  ],
  siteName: 'Estudio Juridico - Celiz',
  title: 'Celiz - Estudio Juridico',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
