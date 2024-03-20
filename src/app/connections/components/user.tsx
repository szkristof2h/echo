"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { acceptConnection, deleteConnection } from "~/app/lib/actions"

export default function User(props: {
  id: string
  displayName: string
  isPending: boolean
}) {
  const { id, displayName, isPending } = props
  const { userId: idUser } = useAuth()

  return (
    <li key={id}>
      <Link href={`/profile/${id}`}>{displayName}</Link>
      {idUser && idUser !== id && isPending && (
        <span
          className="ml-4 cursor-pointer"
          onClick={() => acceptConnection(id)}
        >
          ✅
        </span>
      )}
      {idUser && (
        <span
          className="ml-4 cursor-pointer"
          onClick={() => deleteConnection(id)}
        >
          ❌
        </span>
      )}
    </li>
  )
}
