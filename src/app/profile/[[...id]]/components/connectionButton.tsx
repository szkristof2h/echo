"use client"
import { createConnection } from "~/app/lib/actions"

export default async function ConnectionButton(props: {
  hasConnection: boolean
  isPending: boolean
}) {
  const { hasConnection, isPending } = props
  return (
    <span
      className="ml-auto inline-block cursor-pointer hover:underline"
      onClick={() => createConnection({ idUser: 1, idConnection: 2 })}
    >
      {hasConnection ? (isPending ? "sent" : "your connection") : "connect"}
    </span>
  )
}
