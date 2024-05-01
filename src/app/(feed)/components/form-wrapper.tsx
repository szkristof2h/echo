"use client"

import EchoForm from "~/app/echoTo/[[...id]]/components/echo-form"

export default function FormWrapper(props: {
  idUser: string
  idParent?: number
  defaultTitle?: string
  isAdmin: boolean
}) {
  const { idUser, idParent, defaultTitle, isAdmin } = props

  return (
    <EchoForm
      id={idUser}
      idParent={idParent}
      defaultTitle={defaultTitle}
      isAdmin={isAdmin}
    />
  )
}
