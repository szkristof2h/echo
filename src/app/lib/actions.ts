"use server"
import { revalidatePath } from "next/cache"
import { createEcho as createEchoData } from "~/data/echos"

export type ActionResponse = {
  errors?: string[]
  status: string
}

export async function createEcho(id: number, formData: FormData) {
  setTimeout(() => {
    console.log("Delayed for 3 second.")
  }, 3000)
  // TODO: add validation
  const rawFormData = {
    text: formData.get("text")?.toString(),
    idSender: 2, // get it from cookie
    idUser: id,
  }

  if (
    rawFormData.text == null ||
    rawFormData.idSender == null ||
    rawFormData.idUser == null
  )
    return { errors: ["invalid field value"], status: "failure" }

  const res = await createEchoData(rawFormData)

  if (!Array.isArray(res) && res.hasOwnProperty("message"))
    return { errors: [res.message], status: "failure" }

  revalidatePath("/echo/[[...id]]", "page")

  return {
    status: "success",
  }
  // mutate data
  // revalidate cache
}
