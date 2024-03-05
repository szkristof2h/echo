"use client"
import { createConnection, deleteConnection } from "~/app/lib/actions"

export default async function ConnectionButton(props: {
  idConnection: number
  hasConnection: boolean
  isPending: boolean
}) {
  const { idConnection, hasConnection, isPending } = props

  // TODO: rename args
  const handleOnClick = async (idUser: number, id2: number) => {
    if (!hasConnection) await createConnection({ idUser, idConnection: id2 })
    else await deleteConnection({ idUser, idConnection: id2 })
  }

  return (
    <span
      className="ml-auto inline-block cursor-pointer hover:underline"
      onClick={() => handleOnClick(1, idConnection)}
    >
      {hasConnection ? (isPending ? "sent" : "your connection") : "connect"}
    </span>
  )
}
