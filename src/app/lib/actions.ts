"use server"
import { createEcho as createEchoData } from "~/data/echos"

export async function createEcho(id: number, formData: FormData) {
  // TODO: add validation
  const rawFormData = {
    text: formData.get("text")?.toString(),
    idSender: id,
    idUser: 2,
  }

  if (
    rawFormData.text == null ||
    rawFormData.idSender == null ||
    rawFormData.idUser == null
  )
    return { errors: ["invalid field value"] }

  const res = await createEchoData(rawFormData)

  if (!Array.isArray(res) && res.hasOwnProperty("message"))
    return { errors: [res.message] }

  return {
    status: "success",
  }
  // mutate data
  // revalidate cache
  console.log("here", formData.get("text"))
}
