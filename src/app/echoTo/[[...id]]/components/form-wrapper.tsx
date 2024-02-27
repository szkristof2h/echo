"use client"
import EchoForm from "./echo-form"
import UserForm from "./user-form"
import { useState } from "react"

export default function FormWrapper(props: { id?: number }) {
  const { id } = props
  const [idSelected, setIdSelected] = useState(id)

  return (
    <>
      ID: {idSelected}
      <UserForm id={id} setIdSelected={setIdSelected} />
      <EchoForm id={idSelected} />
    </>
  )
}
