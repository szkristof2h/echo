import { echos, insertEchoSchema } from "~/db/schema/echos"
import db from "~/db"
import { eq, and, gt, desc, isNull } from "drizzle-orm"
import validationErrorHandler from "./validationErrorHandler"
import { auth } from "@clerk/nextjs"
import { topics } from "~/db/schema/topics"

export type CreateEchoData = {
  idSender?: string
  idUser?: string
  idParent?: number
  text?: string
  title?: string
}
export type UpdateEchoData = {
  id?: number
} & CreateEchoData

export async function createTopic(topic: string) {
  try {
    const result = await db.insert(topics).values({ text: topic }).returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    validationErrorHandler(error)

    return { message: "Database error: failed topic creation" }
  }
}

export async function getCurrentTopic() {
  try {
    const topic = await db
      .select()
      .from(topics)
      .orderBy(desc(topics.date))
      .limit(1)

    if (!topic) return null

    return topic
  } catch (error) {
    console.error("Database error: getting current topic")
    console.error(error)
    return null
  }
}
