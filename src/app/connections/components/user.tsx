"use client"

import Link from "next/link"
import { acceptConnection, deleteConnection } from "~/app/lib/actions"

export default function User(props: {
  id: number
  idUser: number
  displayName: string
  isPending: boolean
}) {
  const { id, idUser, displayName, isPending } = props

  return (
    <li key={id}>
      <Link href={`/profile/${id}`}>{displayName}</Link>
      {idUser !== id && isPending && (
        <span
          className="ml-4 cursor-pointer"
          onClick={() => acceptConnection({ idUser, idConnection: id })}
        >
          ✅
        </span>
      )}
      <span
        className="ml-4 cursor-pointer"
        onClick={() => deleteConnection({ idUser, idConnection: id })}
      >
        ❌
      </span>
    </li>
  )
}
