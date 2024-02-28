"use client"
import EchoForm from "./echo-form"
import UserForm from "./user-form"
import { useState } from "react"

export default function FormWrapper(props: {
  idDefault?: number
  defaultName?: string
}) {
  const { idDefault, defaultName } = props
  const [idSelected, setIdSelected] = useState(idDefault)

  return (
    <>
      <UserForm
        idDefault={idDefault}
        defaultName={defaultName}
        setIdSelected={setIdSelected}
        idSelected={idSelected}
      />
      <EchoForm id={idSelected} />
    </>
  )
}
