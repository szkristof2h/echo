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
