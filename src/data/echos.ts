import { echos, insertEchoSchema } from "~/db/schema/echos"
import db from "~/db"
import { eq, and, gt, desc } from "drizzle-orm"

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

  try {
    const validatedEcho = insertEchoSchema.parse({
      text,
      title,
      idSender,
      idUser,
    })

    const result = await db.insert(echos).values(validatedEcho).returning()

    if (!result[0]) throw new Error("some error")

    return result[0]
  } catch (error) {
    if (error && typeof error === "object" && "issues" in error)
      if (Array.isArray(error.issues))
        error.issues.forEach((e) => {
          console.error("--------- ECHO VALIDATION ERROR ---------")
          if ("message" in e) console.error(e?.message)
          if ("path" in e) console.error(e?.path)
        })

    return { message: "Database error: failed echo creation" }
  }
}

export async function getEchos(offset = 0) {
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
      limit: 10,
      offset,
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

export async function updateEcho(echo: UpdateEchoData) {}
export async function deleteEcho(id: string) {}
