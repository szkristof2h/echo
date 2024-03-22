"use server"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  addConnection,
  removeConnection,
  updateConnection,
} from "~/data/connections"
import { createEcho as createEchoData } from "~/data/echos"

export type ActionResponse = {
  errors?: string[]
  status: string
}

export async function createEcho(
  formData: FormData,
  id?: string,
  idParent?: number,
) {
  const { userId: idUser } = auth()

  if (!idUser) return redirect(`/login`)

  const rawFormData = {
    text: formData.get("text")?.toString(),
    title: formData.get("title")?.toString(),
    idSender: "1", // get it from cookie
    idParent,
    idUser: id,
  }

  const res = await createEchoData(rawFormData)

  if (res && "message" in res)
    return { errors: [res.message], status: "failure" }

  if (!idParent) redirect(`/echo/${res.id}`)
  else {
    revalidatePath("/echo/[[...id]]", "page")
    return { errors: [], status: "success" }
  }
}

export async function createConnection(id: string) {
  // TODO: add proper error handling

  const { userId: idUser } = auth()

  if (idUser) await addConnection(idUser, id)

  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/profile/[[...id]]", "page")
}

export async function deleteConnection(id: string) {
  const { userId: idUser } = auth()

  if (idUser) await removeConnection(idUser, id)

  // TODO: add proper error handling
  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/profile/[[...id]]", "page")
}

export async function acceptConnection(id: string) {
  const { userId: idUser } = auth()

  if (idUser) await updateConnection(id, idUser, false)

  // TODO: add proper error handling
  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/connections", "page")
}
