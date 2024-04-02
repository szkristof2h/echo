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
    <li key={idConnection} className="mb-4 grid grid-cols-3 gap-4">
      <Link className="button-primary" href={`/profile/${idConnection}`}>
        {displayName}
      </Link>
      {idUser !== idLoggedInUser && isPending && (
        <Button
          theme="success"
          iconName="plus"
          onClick={() => acceptConnection(idConnection)}
        >
          Accept
        </Button>
      )}
      <Button
        theme="danger"
        iconName="cross"
        onClick={() => handleDelete(idConnection)}
      >
        {declineText}
      </Button>
    </li>
  )
}
