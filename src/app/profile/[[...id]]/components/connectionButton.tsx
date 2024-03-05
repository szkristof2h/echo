"use client"
import { createConnection } from "~/app/lib/actions"

export default async function ConnectionButton(props: {
  idConnection: number
  hasConnection: boolean
  isPending: boolean
}) {
  const { idConnection, hasConnection, isPending } = props
  return (
    <span
      className="ml-auto inline-block cursor-pointer hover:underline"
      onClick={() => createConnection({ idUser: 1, idConnection })}
    >
      {hasConnection ? (isPending ? "sent" : "your connection") : "connect"}
    </span>
  )
}
