"use client"
import Container from "~/app/components/container"
import EchoForm from "./echo-form"
import UserForm from "./user-form"
import { useState } from "react"

export default function FormWrapper(props: {
  idDefault?: string
  echoCount?: number | null
  defaultName?: string | null
  isAdmin: boolean
}) {
  const { echoCount, idDefault, defaultName, isAdmin } = props
  const [idSelected, setIdSelected] = useState(idDefault)

  return (
    <div className="flex flex-col gap-4">
      {(!!echoCount || echoCount === 0) && (
        <Container theme="tertiary" className="text-center">
          Echos remaining today: {5 - echoCount}
        </Container>
      )}
      <Container title="Break the Echo">
        <UserForm
          defaultName={defaultName}
          setIdSelected={setIdSelected}
          idSelected={idSelected}
        />
        <EchoForm id={idSelected} isAdmin={isAdmin} />
      </Container>
    </div>
  )
}
