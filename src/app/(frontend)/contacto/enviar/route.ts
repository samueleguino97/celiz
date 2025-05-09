import { getPayload } from 'payload'

import configPromise from '@payload-config'

export async function POST(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & Request,
): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const body = await req.json()

  const email = await payload.sendEmail({
    to: 'javiercelizo@gmail.com',
    subject: 'Consulta / Solicitud de Servicio',
    html: body.content,
  })
  console.log(email)

  return new Response('ok')
}
