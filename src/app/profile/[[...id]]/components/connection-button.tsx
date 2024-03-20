"use client"
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
    <span
      className="ml-auto inline-block cursor-pointer hover:underline"
      onClick={() => handleOnClick(idConnection)}
    >
      {hasConnection ? (isPending ? "sent" : "your connection") : "connect"}
    </span>
  )
}
