import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Spectral } from 'next/font/google'
import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
const font = Spectral({
  weight: ['200', '300', '600', '500', '400', '700'],
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(font.className)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/logo.png" rel="icon" sizes="32x32" type="image/png" />
        <title>Celiz - Estudio Juridico</title>
      </head>
      <body className="bg-[white] text-[#FEFCF3]">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
