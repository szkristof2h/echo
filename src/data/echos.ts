import { echos, insertEchoSchema } from "~/db/schema/echos"
import db from "~/db"
import { eq, and, gt, desc } from "drizzle-orm"
import validationErrorHandler from "./validationErrorHandler"

export type CreateEchoData = {
  idSender?: number
  idUser?: number
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
          },
          where: eq(echos.id, idParent),
          with: {
            postedBy: {
              columns: {
                id: true,
              },
            },
          },
        })
      : null

    if (!!idParent && !echoParent) throw new Error("invalid sth")

    const title = echoParent?.title ?? echo?.title
    const idUser = echoParent?.postedBy.id ?? echo?.idUser
    const validatedEcho = insertEchoSchema.parse({
      text,
      title,
      idSender,
      idUser,
      idParent,
    })

    const result = await db.insert(echos).values(validatedEcho).returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    validationErrorHandler(error)

    return { message: "Database error: failed echo creation" }
  }
}

export async function getEchos(offset = 0, idParent?: number) {
  try {
    const echosByDate = await db.query.echos.findMany({
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
      orderBy: [desc(echos.date)],
      limit: 20,
      offset,
      ...(idParent ? { where: eq(echos.idParent, idParent) } : {}),
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
  const idUser = 3
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
