"use client"

import Link from "next/link"
import { Button } from "~/app/components/button"
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
  const handleDelete = async (id: string) => {
    if (type === "follow") await deleteFollow(id)
    else await deleteConnection(id)
  }
  const declineText =
    type === "follow" ? "Unfollow" : isPending ? "Decline" : "Remove"

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

      <Button  onClick={() => handleDelete(idConnection)}>
        ❌ {declineText}
      </Button>
    </li>
  )
}
