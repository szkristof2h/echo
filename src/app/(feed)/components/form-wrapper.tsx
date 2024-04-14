"use client"

import EchoForm from "~/app/echoTo/[[...id]]/components/echo-form"

export default function FormWrapper(props: {
  idUser: string
  idParent?: number
  defaultTitle?: string
}) {
  const { idUser, idParent, defaultTitle } = props

  return (
    <EchoForm id={idUser} idParent={idParent} defaultTitle={defaultTitle} />
  )
}
