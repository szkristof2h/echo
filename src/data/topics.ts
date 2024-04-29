import "server-only"
import db from "~/db"
import { desc, eq, inArray } from "drizzle-orm"
import validationErrorHandler from "./validationErrorHandler"
import { topics } from "~/db/schema/topics"
import { env } from "~/env"

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

export async function getTopic(id: number) {
  try {
    const topic = await db.query.topics.findFirst({
      where: eq(topics.id, id),
    })

    if (!topic) return null

    return topic
  } catch (error) {
    console.error("Database error: getting topic")
    console.error(error)
    return null
  }
}

export async function getTopics(ids: number[]) {
  try {
    const topicsById = await db.query.topics.findMany({
      orderBy: [desc(topics.date)],
      limit: 100,
      where: inArray(topics.id, ids),
    })

    return topicsById
  } catch (error) {
    console.error("Database error: getting topics")
    console.error(error)
    return null
  }
}

export async function getTopicMatch(title: string) {
  try {
    const topic = await getCurrentTopic()

    if (!topic?.[0]?.id) return null

    const body = JSON.stringify({
      title,
      topic: topic?.[0]?.text,
    })

    const res = await fetch(`${env.ECHO_BREAKER_URL}/weekly-match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.ECHO_BREAKER_API_KEY!,
      },
      body,
    })

    const data = (await res.json()) as unknown

    if (
      !!data &&
      typeof data === "object" &&
      "match" in data &&
      !!data.match &&
      typeof data.match === "object" &&
      "content" in data.match &&
      typeof data.match.content === "string"
    ) {
      const content = JSON.parse(data.match.content) as unknown

      if (
        !!content &&
        typeof content === "object" &&
        "is_match" in content &&
        !!content.is_match &&
        typeof content.is_match === "string"
      ) {
        const { is_match: isMatch } = content

        if (isMatch === "yes") return topic?.[0]?.id
        else if (isMatch === "no") return null
        else return null
      }
    }
  } catch (error) {
    console.error("Error while getting topic match")

    return null
  }
}
