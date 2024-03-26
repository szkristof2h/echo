"use client"
import EchoForm from "./echo-form"
import UserForm from "./user-form"
import { useState } from "react"

export default function FormWrapper(props: {
  idDefault?: string
  echoCount?: number | null
  defaultName?: string | null
}) {
  const { echoCount, idDefault, defaultName } = props
  const [idSelected, setIdSelected] = useState(idDefault)

  return (
    <div className="flex w-128 flex-col ">
      {(!!echoCount || echoCount === 0) && (
        <div className="bg-tertiary-light mb-4 p-2 text-center">
          Echos remaining today: {5 - echoCount}
        </div>
      )}
      <UserForm
        defaultName={defaultName}
        setIdSelected={setIdSelected}
        idSelected={idSelected}
      />
      <EchoForm id={idSelected} />
    </div>
  )
}
