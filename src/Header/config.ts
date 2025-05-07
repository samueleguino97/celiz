import type { GlobalConfig } from 'payload'

export const Inicio: GlobalConfig = {
  slug: 'inicio',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'about-me',
      type: 'text',
      label: 'Acerca de mi',
      required: true,
    },
    {
      name: 'quote',
      type: 'text',
      label: 'Cita',
      required: true,
    },
  ],
}
