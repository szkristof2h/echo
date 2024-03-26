"use client"

import Link from "next/link"
import { acceptConnection, deleteConnection } from "~/app/lib/actions"

export default function User(props: {
  idConnection: string
  idUser?: string
  idLoggedInUser?: string | null
  displayName: string
  isPending: boolean
}) {
  const { idConnection, displayName, isPending, idUser, idLoggedInUser } = props

  return (
    <li key={idConnection}>
      <Link href={`/profile/${idConnection}`}>{displayName}</Link>
      {idUser !== idLoggedInUser && isPending && (
        <span
          className="ml-4 cursor-pointer"
          onClick={() => acceptConnection(idConnection)}
        >
          ✅
        </span>
      )}

      <span
        className="ml-4 cursor-pointer"
        onClick={() => deleteConnection(idConnection)}
      >
        ❌
      </span>
    </li>
  )
}
