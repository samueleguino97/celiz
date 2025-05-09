'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: any
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <div className="bg-[#00264D]">
      <header
        className="container relative z-20  pb-8 "
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="pt-8 pb-2 flex md:flex-row flex-col justify-between items-center">
          <div className="flex-1 md:block hidden">
            <HeaderNav data={{ navItems: data.navItems?.slice(0, data.navItems.length / 2) }} />
          </div>
          <Link href="/" className="flex flex-col items-center">
            <Logo loading="eager" priority="high" className="" />

            <h2 className="text-xl  mt-2 font-semibold tracking-normal text-center text-[#e0c464]">
              CELIZ
            </h2>

            <h2 className="text-xs   font-normal tracking-normal text-center text-[#e0c464]">
              Oficina de Abogados
            </h2>
          </Link>
          <HeaderNav data={{ navItems: data.navItems?.slice(data.navItems.length / 2) }} />
        </div>
      </header>
    </div>
  )
}
