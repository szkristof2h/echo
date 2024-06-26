import "server-only"
import { connections, insertConnectionSchema } from "~/db/schema/connections"
import db from "~/db"
import { and, eq, or } from "drizzle-orm"
import validationErrorHandler from "./validationErrorHandler"
import { auth, clerkClient } from "@clerk/nextjs"

export async function addConnection({
  idUser,
  idConnection,
  type,
  isPending = true,
}: {
  idUser: string
  idConnection: string
  isPending?: boolean
  type: "connection" | "follow"
}) {
  console.log("should be at server")

  try {
    const connection = {
      idUser,
      idConnection,
      isPending,
      type,
    }

    const validatedConnection = insertConnectionSchema.parse(connection)
    const user = await clerkClient.users.getUser(idUser)
    const connectionUser = await clerkClient.users.getUser(idConnection)

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
    validationErrorHandler(error)

    return { message: "Database error: failed connection creation" }
  }
}

export async function updateConnection(
  idUser: string,
  idConnection: string,
  isPending?: boolean,
) {
  console.log("should be at server")

  try {
    const connection = {
      idUser,
      idConnection,
      isPending,
    }

    insertConnectionSchema.parse(connection)

    const user = await clerkClient.users.getUser(idUser)
    const connectionUser = await clerkClient.users.getUser(idConnection)

    if (!user || !connectionUser)
      // return some error
      return

    const result = await db
      .update(connections)
      .set({ isPending })
      .where(
        and(
          eq(connections.idUser, idUser),
          eq(connections.idConnection, idConnection),
        ),
      )
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    validationErrorHandler(error)

    return { message: "Database error: failed connection update" }
  }
}

export async function removeConnection(idUser: string, id: string) {
  console.log("should be at server")

  try {
    const user = await clerkClient.users.getUser(idUser)
    const connectionUser = await clerkClient.users.getUser(id)

    if (!user || !connectionUser)
      // return some error
      return

    const result = await db
      .delete(connections)
      .where(
        and(
          or(
            and(
              eq(connections.idUser, idUser),
              eq(connections.idConnection, id),
            ),
            and(
              eq(connections.idUser, id),
              eq(connections.idConnection, idUser),
            ),
          ),
          eq(connections.type, "connection"),
        ),
      )
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    return { message: "Database error: failed connection removal" }
  }
}

export async function removeFollow(idUser: string, id: string) {
  console.log("should be at server")

  try {
    const user = await clerkClient.users.getUser(idUser)
    const connectionUser = await clerkClient.users.getUser(id)

    if (!user || !connectionUser)
      // return some error
      return

    const result = await db
      .delete(connections)
      .where(
        and(
          and(eq(connections.idUser, idUser), eq(connections.idConnection, id)),
          eq(connections.type, "follow"),
        ),
      )
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    return { message: "Database error: failed connection removal" }
  }
}

export async function getConnections(options?: {
  isPending: boolean | undefined
}) {
  console.log("should be at server")
  const { userId: idUser } = auth()

  if (!idUser) return null

  const isPending = options?.isPending
  const where = and(
    or(eq(connections.idUser, idUser), eq(connections.idConnection, idUser)),
    eq(connections.type, "connection"),
  )
  const whereWithPending =
    isPending !== undefined
      ? and(where, eq(connections.isPending, isPending))
      : where

  try {
    // TODO: add limit etc
    const connectionsList = await db
      .select({
        idUser: connections.idUser,
        idConnection: connections.idConnection,
        isPending: connections.isPending,
      })
      .from(connections)
      .where(whereWithPending)

    if (connectionsList.length === 0) return []

    return connectionsList
  } catch (error) {
    console.error("Database error: failed getting connections")
    console.error(error)
    return null
  }
}

export async function getFollows() {
  console.log("should be at server")
  const { userId: idUser } = auth()

  if (!idUser) return null

  try {
    // TODO: add limit etc
    const follows = await db
      .select({
        idUser: connections.idUser,
        idConnection: connections.idConnection,
      })
      .from(connections)
      .where(
        and(eq(connections.idUser, idUser), eq(connections.type, "follow")),
      )

    if (follows.length === 0) return []

    return follows
  } catch (error) {
    console.error("Database error: failed getting follows")
    console.error(error)
    return null
  }
}

export async function getConnection(idConnection: string) {
  console.log("should be at server")

  const { userId: idUser } = auth()

  if (!idUser) return null

  try {
    const userConnection = await db.query.connections.findFirst({
      where: and(
        eq(connections.type, "connection"),
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
      ),
    })

    return userConnection
  } catch (error) {
    console.error("Database error: failed getting connection")
    console.error(error)
    return null
  }
}

export async function getFollow(idConnection: string) {
  console.log("should be at server")

  const { userId: idUser } = auth()

  if (!idUser) return null

  try {
    const userConnection = await db.query.connections.findFirst({
      where: and(
        and(
          eq(connections.idUser, idUser),
          eq(connections.idConnection, idConnection),
        ),
        eq(connections.type, "follow"),
      ),
    })

    return userConnection
  } catch (error) {
    console.error("Database error: failed getting connection")
    console.error(error)
    return null
  }
}
