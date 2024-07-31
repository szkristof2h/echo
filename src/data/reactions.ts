import "server-only"
import { reactions, insertReactionSchema } from "~/db/schema/reactions"
import db from "~/db"
import { and, eq } from "drizzle-orm"
import validationErrorHandler from "./validationErrorHandler"
import { auth } from "@clerk/nextjs"

export async function getReactionsByEcho(idEcho: string) {
  try {
    const results = await db.query.reactions.findMany({
      where: eq(reactions.idEcho, idEcho),
    })

    return results
  } catch (error) {
    console.error("Database error: getting reactions")
    console.error(error)

    return []
  }
}

export async function getReaction(idEcho: string) {
  try {
    const { userId: idUser } = auth()

    if (!idUser) return null

    const result = await db.query.reactions.findFirst({
      where: and(eq(reactions.idEcho, idEcho), eq(reactions.idUser, idUser)),
    })

    return result
  } catch (error) {
    console.error("Database error: getting reactions")
    console.error(error)

    return []
  }
}

export async function createReaction({
  idEcho,
  type,
}: {
  idEcho: string
  type: "agree" | "disagree" //enum?
}) {
  const { userId: idUser } = auth()

  if (!idUser) return null

  try {
    const reaction = {
      idUser,
      idEcho,
      type,
    }

    const validatedReaction = insertReactionSchema.parse(reaction)

    const result = await db
      .insert(reactions)
      .values(validatedReaction)
      .returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    validationErrorHandler(error)

    return { message: "Database error: failed reaction creation" }
  }
}

export async function updateReaction({
  idEcho,
  type,
}: {
  idEcho: string
  type: "agree" | "disagree"
}) {
  const { userId: idUser } = auth()

  if (!idUser) return null

  try {
    const reaction = {
      idUser,
      idEcho,
      type,
    }

    const validatedReaction = insertReactionSchema.parse(reaction)

    const result = await db
      .update(reactions)
      .set(validatedReaction)
      .where(and(eq(reactions.idUser, idUser), eq(reactions.idEcho, idEcho)))
      .returning()

    if (!result[0]) throw new Error("some error")
    return result[0]
  } catch (error) {
    validationErrorHandler(error)

    return { message: "Database error: failed reaction creation" }
  }
}
