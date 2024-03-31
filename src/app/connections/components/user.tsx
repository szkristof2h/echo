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
      <Link
        className="bg-secondary-dark hover:bg-secondary-light px-2 py-1 text-white"
        href={`/profile/${idConnection}`}
      >
        {displayName}
      </Link>
      {idUser !== idLoggedInUser && isPending && (
        <span
          className="ml-4 cursor-pointer bg-emerald-200 px-2 py-1 hover:bg-emerald-300"
          onClick={() => acceptConnection(idConnection)}
        >
          ✅ Accept
        </span>
      )}

      <span
        className="bg-danger-light hover:bg-danger-dark ml-4 cursor-pointer px-2 py-1 text-white"
        onClick={() => deleteConnection(idConnection)}
      >
        ❌ Decline
      </span>
    </li>
  )
}
