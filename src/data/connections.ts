import "server-only"
import { users, connections, insertConnectionSchema } from "~/db/schema/users"
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
    const connection = {
      idUser,
      idConnection,
      isPending: true,
    }

    const validatedConnection = insertConnectionSchema.parse(connection)
    const user = await db.query.users.findFirst({ where: eq(users.id, idUser) })
    const connectionUser = await db.query.users.findFirst({
      where: eq(users.id, idConnection),
    })

    if (!user || !connectionUser)
      // return some error
      return

    const result = await db
      .insert(connections)
      .values(validatedConnection)
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    if (error && typeof error === "object" && "issues" in error)
      if (Array.isArray(error.issues))
        error.issues.forEach((e) => {
          console.error("--------- CONNECTION VALIDATION ERROR ---------")
          if ("message" in e) console.error(e?.message)
          if ("path" in e) console.error(e?.path)
        })

    return { message: "Database error: failed connection creation" }
  }
}

export async function updateConnection({
  idUser,
  idConnection,
  isPending,
}: {
  idUser: number
  idConnection: number
  isPending: boolean
}) {
  // TODO: auth user
  console.log("should be at server")
  try {
    const connection = {
      idUser,
      idConnection,
      isPending,
    }

    insertConnectionSchema.parse(connection)

    const user = await db.query.users.findFirst({ where: eq(users.id, idUser) })
    const connectionUser = await db.query.users.findFirst({
      where: eq(users.id, idConnection),
    })

    if (!user || !connectionUser)
      // return some error
      return

    const result = await db
      .update(connections)
      .set({ isPending })
      .where(
        or(
          and(
            eq(connections.idUser, idUser),
            eq(connections.idConnection, idConnection),
          ),
          and(
            eq(connections.idUser, idConnection),
            eq(connections.idConnection, idUser),
          ),
        ),
      )
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    if (error && typeof error === "object" && "issues" in error)
      if (Array.isArray(error.issues))
        error.issues.forEach((e) => {
          console.error("--------- CONNECTION VALIDATION ERROR ---------")
          if ("message" in e) console.error(e?.message)
          if ("path" in e) console.error(e?.path)
        })

    return { message: "Database error: failed connection update" }
  }
}
export async function removeConnection({
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
    const connectionUser = await db.query.users.findFirst({
      where: eq(users.id, idConnection),
    })

    if (!user || !connectionUser)
      // return some error
      return

    const result = await db
      .delete(connections)
      .where(
        or(
          and(
            eq(connections.idUser, idUser),
            eq(connections.idConnection, idConnection),
          ),
          and(
            eq(connections.idUser, idConnection),
            eq(connections.idConnection, idUser),
          ),
        ),
      )
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    return { message: "Database error: failed connection removal" }
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
