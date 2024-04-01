"use client"

import Link from "next/link"
import {
  acceptConnection,
  deleteConnection,
  deleteFollow,
} from "~/app/lib/actions"

export default function User(props: {
  idConnection: string
  idUser?: string
  idLoggedInUser?: string | null
  displayName: string
  isPending: boolean
  type: "connection" | "follow"
}) {
  const { idConnection, displayName, isPending, idUser, idLoggedInUser, type } =
    props
  const handleDelete = (id: string) => {
    if (type === "follow") deleteFollow(id)
    else deleteConnection(id)
  }
  const declineText =
    type === "follow" ? "Unfollow" : isPending ? "Decline" : "Remove"

  return (
    <li key={idConnection}>
      <Link
        className="bg-secondary-dark px-2 py-1 text-white hover:bg-secondary-light"
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
        className="ml-4 cursor-pointer bg-danger-light px-2 py-1 text-white hover:bg-danger-dark"
        onClick={() => handleDelete(idConnection)}
      >
        ❌ {declineText}
      </span>
    </li>
  )
}
