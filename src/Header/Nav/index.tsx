'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'

import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: { navItems?: any } }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex md:flex-row flex-col gap-6 flex-1 justify-evenly pt-4 items-center">
      {navItems.map(({ link }: any, i: any) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn('text-[#FEFFFC] text-lg uppercase tracking-wide')}
          />
        )
      })}
    </nav>
  )
}
