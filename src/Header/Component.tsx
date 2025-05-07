import { HeaderClient } from './Component.client'
import React from 'react'

export async function Header() {
  return (
    <HeaderClient
      data={{
        id: 1,
        navItems: [
          {
            link: {
              label: 'Inicio',
              url: '/',
              type: 'custom',
            },
          },
          {
            link: {
              label: 'Articulos',
              url: '/articulos',
              type: 'custom',
            },
          },
          {
            link: {
              label: 'Articulos',
              url: '/articulos',
              type: 'custom',
            },
          },
          {
            link: {
              label: 'Contacto',
              url: '/contacto',
              type: 'custom',
            },
          },
        ],
      }}
    />
  )
}
