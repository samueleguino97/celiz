'use client'

import { useState } from 'react'

function Page() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  async function sendEmail() {
    setSending(true)
    const formattedEmailContent = `
    <p>Hola mi nombre es ${formState.name} y me gustaria hacer una consulta.</p>
    <p>Correo: ${formState.email}</p>
    <p>${formState.message}</p>
    `
    try {
      await fetch('/api/contacto/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: formattedEmailContent,
        }),
      })
    } catch (error) {
      console.error(error)
    }
    setSent(true)
    setSending(false)
  }
  function sendWhatsapp() {
    setSending(true)
    const link = `https://api.whatsapp.com/send?phone=+59179776992&text=${encodeURIComponent(
      `Buen Dia,
  mi nombre es ${formState.name}, correo: ${formState.email}.
  Me gustaria hacerle una consulta.
  ${formState.message}`,
    )}`
    const tag = document.createElement('a')
    tag.setAttribute('href', link)
    tag.setAttribute('target', '_blank')
    tag.click()
    setSending(false)
    setSent(true)
  }
  if (sent) {
    return (
      <div className="p-8">
        <h1 className="text-5xl text-center font-semibold  text-[#00264d] ">¡Gracias!</h1>
        <h2 className="text-2xl text-center font-light max-w-lg mx-auto mt-4  text-[#00264d] ">
          {' '}
          Tu mensaje ha sido enviado.{' '}
        </h2>
      </div>
    )
  }
  return (
    <div className="p-8">
      <h1 className="text-5xl text-center font-semibold  text-[#00264d] ">Ponte en contacto</h1>

      <h2 className="text-2xl text-center font-light max-w-lg mx-auto mt-4  text-[#00264d] ">
        ¿Tienes alguna pregunta o quieres agendar una consulta? Llena el formulario y nos pondremos
        en contacto con usted.
      </h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setSending(true)
          await sendEmail()
          setSent(true)
          setSending(false)
        }}
        className="container mx-auto p-4 flex flex-col gap-8 max-w-xl bg-[#00264d] rounded-lg text-[#00264d] text-xl mt-10"
      >
        <input
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          type="text"
          placeholder="Nombre"
          className="bg-white p-2 rounded-lg "
          required
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="bg-white p-2 rounded-lg"
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <textarea
          required
          placeholder="Cuentanos sobre tu consulta/caso"
          className="bg-white p-2 rounded-lg h-48"
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
        />
        <div className="flex justify-between gap-8">
          <button
            type="button"
            onClick={() => sendWhatsapp()}
            className="bg-[white] text-[#00264d] px-4 py-2 border-2 disabled:opacity-50 rounded-lg"
            disabled={sending}
          >
            Enviar Whatsapp
          </button>
          <button
            type="submit"
            disabled={sending}
            className="bg-[white] text-[#00264d] px-4 py-2 border-2 rounded-lg disabled:opacity-50"
          >
            Enviar Correo
          </button>
        </div>
      </form>
    </div>
  )
}

export default Page
