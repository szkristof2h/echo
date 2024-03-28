"use server"
import { auth, clerkClient, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  addConnection,
  removeConnection,
  updateConnection,
} from "~/data/connections"
import { createEcho as createEchoData } from "~/data/echos"
import { getUser, updateUser } from "~/data/users"

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
    idSender: idUser,
    idParent,
    idUser: id,
  }

  const receiverUser = id ? await getUser(id) : null

  if (!receiverUser)
    return { errors: ["user doesn't exist"], status: "failure" }

  const res = await createEchoData(rawFormData)

  if (res && "message" in res)
    return { errors: [res.message], status: "failure" }

  if (!idParent) redirect(`/echo/${res.id}`)
  else {
    revalidatePath("/echo/[[...id]]", "page")
    return { errors: [], status: "success" }
  }
}
export async function updateProfile(
  _: ActionResponse | undefined,
  formData: FormData,
) {
  const { userId: idUser } = auth()

  if (!idUser) return redirect(`/login`)

  const rawFormData = {
    username: formData.get("username")?.toString(),
    bio: formData.get("bio")?.toString(),
    interests: formData.get("interests")?.toString().slice(0, 1024),
  }

  const interestsArray =
    rawFormData.interests?.split(",").filter((interest) => Boolean(interest)) ??
    []

  if (!rawFormData.username)
    return {
      errors: ["no username"],
      status: "failure",
    }

  try {
    const user = await currentUser()
    const isUsernameSame = user?.username === rawFormData.username
    const isBioSame = user?.publicMetadata.bio === rawFormData.bio
    const isInterestsSame =
      Array.isArray(user?.publicMetadata.interests) &&
      user?.publicMetadata.interests?.join(",") === interestsArray.join(",")
    const hasChange = !isUsernameSame || !isBioSame || !isInterestsSame

    if (!hasChange) return { errors: ["no changes"], status: "failure" }

    if (!isUsernameSame) {
      const users = await clerkClient.users.getUserList({
        username: [rawFormData.username],
      })

      if (users?.length !== 0)
        return {
          errors: ["username already exists"],
          status: "failure",
        }

      if (rawFormData.username.length < 3)
        return {
          errors: ["username too short"],
          status: "failure",
        }
    }

    await updateUser({
      id: idUser,
      username: rawFormData.username,
      bio: rawFormData.bio,
      interests: interestsArray,
    })
  } catch (error) {
    console.error("Action error: failed updating profile")
    console.error(error)
    return { errors: ["something"], status: "failure" }
  }

  redirect("/profile")
}

export async function createFollow(id: string) {
  // TODO: add proper error handling

  const { userId: idUser } = auth()

  if (idUser)
    await addConnection({
      idUser,
      idConnection: id,
      isPending: false,
      type: "follow",
    })

  // if (res && "message" in res)
  //   return { errors: [res.message], status: "failure" }

  revalidatePath("/profile/[[...id]]", "page")
}

export async function createConnection(id: string) {
  // TODO: add proper error handling

  const { userId: idUser } = auth()

  if (idUser)
    await addConnection({
      idUser,
      idConnection: id,
      type: "connection",
    })

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
