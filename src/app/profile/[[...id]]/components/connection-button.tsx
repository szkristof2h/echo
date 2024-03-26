"use client"
import { Button } from "~/app/components/button"
import { createConnection, deleteConnection } from "~/app/lib/actions"

export default function ConnectionButton(props: {
  idConnection: string
  hasConnection: boolean
  isPending: boolean
}) {
  const { idConnection, hasConnection, isPending } = props

  const handleOnClick = async (id: string) => {
    if (!hasConnection) await createConnection(id)
    else await deleteConnection(id)
  }

  return (
    <Button className="h-16 px-4" onClick={() => handleOnClick(idConnection)}>
      {hasConnection ? (isPending ? "sent" : "your connection") : "connect"}
    </Button>
  )
}
