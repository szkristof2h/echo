"use client"
import { createConnection } from "~/app/lib/actions"

const user2 = {
  interests: ["asdasd", "asdas", "dnrfgnwenfji", "erngtyernf"],
  hasConnections: false,
}

export default async function ConnectionButton() {
  const { hasConnections } = user2
  return (
    <span
      className="ml-auto inline-block"
      onClick={() => createConnection({ idUser: 1, idFriend: 2 })}
    >
      {hasConnections ? "your friend" : "add as friend"}
    </span>
  )
}
