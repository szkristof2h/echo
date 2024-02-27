"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createEcho as createEchoData } from "~/data/echos"

export type ActionResponse = {
  errors?: string[]
  status: string
}

export async function createEcho( formData: FormData,id?: number) {
  setTimeout(() => {
    console.log("Delayed for 3 second.")
  }, 3000)
  // TODO: add validation
  const idUser = id
  const rawFormData = {
    text: formData.get("text")?.toString(),
    idSender: 2, // get it from cookie
    idUser,
  }

  if (
    rawFormData.text == null ||
    rawFormData.idSender == null ||
    rawFormData.idUser == null
  )
    return { errors: ["invalid field value"], status: "failure" }

  const res = await createEchoData(rawFormData)

  if (res && "message" in res)
    return { errors: [res.message], status: "failure" }

  // revalidatePath("/echo/[[...id]]", "page")
  redirect(`echo/${res.id}`)

  // mutate data
  // revalidate cache
}
