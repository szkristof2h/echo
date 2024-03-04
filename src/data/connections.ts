import "server-only"
import { users, connections } from "~/db/schema/users"
import db from "~/db"
import { and, desc, eq, or } from "drizzle-orm"

export async function addConnection({
  idUser,
  idConnection,
}: {
  idUser: number
  idConnection: number
}) {
  // TODO: auth user
  console.log("should be at server")
  try {
    const user = await db.query.users.findFirst({ where: eq(users.id, idUser) })
    const friend = await db.query.users.findFirst({
      where: eq(users.id, idConnection),
    })

    if (!user || !friend)
      // return some error
      return

    const connection = {
      idUser,
      idConnection,
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
  // TODO: auth user
  console.log("should be at server")

  const isPending = options?.isPending
  const where = or(eq(connections.idUser, id), eq(connections.idConnection, id))
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

export async function getConnection(idUser: number, idConnection: number) {
  console.log("should be at server")

  // TODO: auth user
  try {
    const userConnection = await db.query.connections.findFirst({
      where: or(
        and(
          eq(connections.idUser, idUser),
          eq(connections.idConnection, idConnection),
        ),
        and(
          eq(connections.idUser, idConnection),
          eq(connections.idConnection, idUser),
        ),
      ),
    })

    return userConnection
  } catch (error) {
    console.error("Database error: failed getting user")
    console.error(error)
    return null
  }
}
