import { echos, insertEchoSchema } from "~/db/schema/echos"
import db from "~/db"
import { eq, and, gt, desc, isNull, inArray } from "drizzle-orm"
import validationErrorHandler from "./validationErrorHandler"
import { auth } from "@clerk/nextjs"
import { getFollows } from "./connections"

export type CreateEchoData = {
  idSender?: string
  idReceiver?: string
  idParent?: number
  text?: string
  title?: string
}
export type UpdateEchoData = {
  id?: number
} & CreateEchoData

export async function createEcho(echo: CreateEchoData) {
  const idSender = echo?.idSender
  const idParent = echo?.idParent
  const text = echo?.text

  try {
    const echoParent = !!idParent
      ? await db.query.echos.findFirst({
          columns: {
            title: true,
            idSender: true,
          },
          where: eq(echos.id, idParent),
        })
      : null

    if (!!idParent && !echoParent) throw new Error("invalid sth")

    const title = echoParent?.title ?? echo?.title
    const idReceiver = echoParent?.idSender ?? echo?.idReceiver
    const validatedEcho = insertEchoSchema.parse({
      text,
      title,
      idSender,
      idReceiver,
      idParent,
    })

    const result = await db.insert(echos).values(validatedEcho).returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    console.error("Database error: failed echo creation")
    const errors = validationErrorHandler(error)
    const message = !!errors?.length && errors?.length > 0 ? errors : []

    return { message }
  }
}

export async function getEchos(offset = 0, idParent?: number) {
  try {
    const echosByDate = await db.query.echos.findMany({
      orderBy: [desc(echos.date)],
      limit: 100,
      offset,
      where: idParent ? eq(echos.idParent, idParent) : isNull(echos.idParent),
    })

    return echosByDate
  } catch (error) {
    console.error("Database error: getting echos")
    console.error(error)

    return []
  }
}

export async function getNotifications(offset = 0) {
  console.log("should be at server")
  const { userId: idUser } = auth()

  if (!idUser) return null

  try {
    const follows = await getFollows()

    if (!follows || follows?.length === 0) return []

    const idUsers = follows.map((follow) => follow.idConnection)

    const echosByDate = await db.query.echos.findMany({
      orderBy: [desc(echos.date)],
      limit: 100,
      offset,
      where: inArray(echos.idSender, idUsers),
    })

    return echosByDate
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
  const { userId: idUser } = auth()

  if (!idUser) return null

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

// export async function updateEcho(echo: UpdateEchoData) {}
// export async function deleteEcho(id: string) {}
