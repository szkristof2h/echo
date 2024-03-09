"use server"
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
  id?: number,
  idParent?: number,
) {
  const rawFormData = {
    text: formData.get("text")?.toString(),
    title: formData.get("title")?.toString(),
    idSender: 1, // get it from cookie
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

export async function createConnection({
  idUser,
  idConnection,
}: {
  idUser: number
  idConnection: number
}) {
  // TODO: add proper error handling
  const res = await addConnection({ idUser, idConnection })
  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/profile/[[...id]]", "page")
}

export async function deleteConnection({
  idUser,
  idConnection,
}: {
  idUser: number
  idConnection: number
}) {
  const res = await removeConnection({ idUser, idConnection })

  // TODO: add proper error handling
  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/profile/[[...id]]", "page")
}

export async function acceptConnection({
  idUser,
  idConnection,
}: {
  idUser: number
  idConnection: number
}) {
  const res = await updateConnection({ idUser, idConnection, isPending: false })

  // TODO: add proper error handling
  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/connections", "page")
}
