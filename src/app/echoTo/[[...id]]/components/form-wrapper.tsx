"use client"
import EchoForm from "./echo-form"
import UserForm from "./user-form"
import { useState } from "react"

export default function FormWrapper(props: {
  idDefault?: number
  echoCount?: number | null
  defaultName?: string
}) {
  const { echoCount, idDefault, defaultName } = props
  const [idSelected, setIdSelected] = useState(idDefault)

  return (
    <>
      {(!!echoCount || echoCount === 0) && (
        <div className="mb-4 text-center">
          Echos remaining today: {5 - echoCount}
        </div>
      )}
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
