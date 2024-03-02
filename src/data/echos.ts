import { NewEcho, echos } from "~/db/schema/echos"
import db from "~/db"
import { eq, and, gt } from "drizzle-orm"

export type CreateEchoData = {
  idSender?: number
  idUser?: number
  text?: string
  title?: string
}
export type UpdateEchoData = {
  id?: number
} & CreateEchoData

export async function createEcho(echo: CreateEchoData) {
  const idSender = echo?.idSender
  const idUser = echo?.idUser
  const text = echo?.text
  const title = echo?.title

  if (!text) return { message: "No text" }
  if (!title) return { message: "No title" }
  if (!idUser) return { message: "Log in" }
  if (!idSender) return { message: "Didn't find user" }

  console.log({ text, idUser, idSender })
  try {
    const newEcho: NewEcho = { idSender, idUser, text, title }
    const result = await db.insert(echos).values(newEcho).returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    console.error("db create echo error")
    console.error(error)
    return { message: "Database error: failed echo creation" }
  }
}

export async function getEchos(offset = 0) {
  try {
    const echos = await db.query.echos.findMany({
      with: {
        postedBy: {
          columns: {
            bio: false,
          },
        },
        echodTo: {
          columns: {
            bio: false,
          },
        },
      },
      limit: 10,
      offset,
    })

    return echos
  } catch (error) {
    console.error("Database error: getting echos")
    console.error(error)

    return []
  }
}

export async function getEcho(id: number) {
  try {
    const echo = await db.query.echos.findFirst({
      where: eq(echos.id, id),
      with: {
        postedBy: {
          columns: {
            bio: false,
          },
        },
        echodTo: {
          columns: {
            bio: false,
          },
        },
      },
    })

    if (!echo) return null

    return echo
  } catch (error) {
    console.error("Database error: getting echo")
    console.error(error)
    return null
  }
}

export async function getDailyEchoCount() {
  const idUser = 5
  const twentyFourHoursBefore = new Date()
  twentyFourHoursBefore.setHours(twentyFourHoursBefore.getHours() - 24)

  try {
    const echo = await db
      .select()
      .from(echos)
      .where(
        and(eq(echos.idSender, idUser), gt(echos.date, twentyFourHoursBefore)),
      )
      .limit(5)

    if (!echo) return null

    return echo.length
  } catch (error) {
    console.error("Database error: getting daily echo count")
    console.error(error)
    return null
  }
}

export async function updateEcho(echo: UpdateEchoData) {}
export async function deleteEcho(id: string) {}
