"use client"

import EchoForm from "~/app/echoTo/[[...id]]/components/echo-form"

export default function FormWrapper(props: {
  idUser: string
  idParent?: number
}) {
  const { idUser, idParent } = props

  return <EchoForm id={idUser} idParent={idParent} />
}
