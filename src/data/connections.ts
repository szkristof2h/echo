import "server-only"
import { users, connections } from "~/db/schema/users"
import db from "~/db"
import { and, desc, eq, or } from "drizzle-orm"

export async function addConnection({
  idUser,
  idFriend,
}: {
  idUser: number
  idFriend: number
}) {
  console.log("should be at server")
  try {
    const user = await db.query.users.findFirst({ where: eq(users.id, idUser) })
    const friend = await db.query.users.findFirst({
      where: eq(users.id, idFriend),
    })

    if (!user || !friend)
      // return some error
      return

    const connection = {
      idUser,
      idFriend,
      isPending: true,
    }

    await db.insert(connections).values(connection)

    // return result
  } catch (error) {
    return error
  }
}

export async function getConnections(
  id: number,
  options?: { isPending: boolean | undefined },
) {
  console.log("should be at server")

  const isPending = options?.isPending
  console.log(isPending !== undefined)
  const where = or(eq(connections.idUser, id), eq(connections.idFriend, id))
  const whereWithPending =
    isPending !== undefined
      ? and(where, eq(connections.isPending, isPending))
      : where

  try {
    const userConnections = await db.query.connections.findMany({
      where: whereWithPending,
      limit: 10,
      orderBy: [desc(connections.date)],
    })

    return userConnections
  } catch (error) {
    console.error("Database error: failed getting user")
    console.error(error)
    return null
  }
}
