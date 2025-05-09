import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Inicio: GlobalConfig = {
  slug: 'inicio',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateHeader],
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
