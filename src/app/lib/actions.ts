"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addConnection } from "~/data/connections"
import { createEcho as createEchoData } from "~/data/echos"

export type ActionResponse = {
  errors?: string[]
  status: string
}

export async function createEcho(formData: FormData, id?: number) {
  // TODO: add validation
  const idUser = id
  const rawFormData = {
    text: formData.get("text")?.toString(),
    title: formData.get("title")?.toString(),
    idSender: 3, // get it from cookie
    idUser,
  }

  const res = await createEchoData(rawFormData)

  if (res && "message" in res)
    return { errors: [res.message], status: "failure" }

  // revalidatePath("/echo/[[...id]]", "page")
  redirect(`/echo/${res.id}`)

  // mutate data
  // revalidate cache
}

export async function createConnection({
  idUser,
  idFriend,
}: {
  idUser: number
  idFriend: number
}) {
  await addConnection({ idUser, idFriend })
}
