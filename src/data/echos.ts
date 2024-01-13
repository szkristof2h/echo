import { NewEcho, echos } from "~/db/schema/echos"
import db from "~/db"
import { eq } from "drizzle-orm"

export type CreateEchoData = {
  idSender?: number
  idUser?: number
  text?: string
}
export type UpdateEchoData = {
  id?: number
} & CreateEchoData

export async function createEcho(echo: CreateEchoData) {
  // const idSender = echo?.idSender
  const idSender = 5
  const idUser = echo?.idUser
  const text = echo?.text

  if (!text) return { message: "No text" }
  if (!idUser) return { message: "No target user" }
  if (!idSender) return { message: "No sender" }

  console.log({ text, idUser, idSender })
  try {
    const newEcho: NewEcho = { idSender, idUser, text }
    const result = await db.insert(echos).values(newEcho).returning()

    return result
  } catch (error) {
    console.log("db create echo error")
    console.log(error)
    return { message: "Database error: failed echo creation" }
  }
}

// export async function getEcho(id: number) {
//   console.log("should be at server")
//   try {
//     const echo = await db.query.echos.findFirst({ where: eq(echos.id, id) })

//     if (!echo) return { message: "echo not found" }

//     return {
//       id: echo.id,
//       displayName: echo.displayName,
//       bio: echo.bio,
//     }
//   } catch (error) {
//     return { message: "Database error: getting echo creation" }
//   }
// }
// export async function getCurrentEcho() {
//   //
//   const id = 5

//   return await getEcho(id)
// }
export async function updateEcho(echo: UpdateEchoData) {}
export async function deleteEcho(id: string) {}
