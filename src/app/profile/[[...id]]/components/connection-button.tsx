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
      className="flex h-16 cursor-pointer items-center bg-emerald-700 px-4 text-white hover:bg-emerald-600"
      onClick={() => handleOnClick(idConnection)}
    >
      {hasConnection ? (isPending ? "sent" : "your connection") : "connect"}
    </span>
  )
}
