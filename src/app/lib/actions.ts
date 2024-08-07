"use server"
import { auth, clerkClient, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  addConnection,
  removeConnection,
  removeFollow,
  updateConnection,
} from "~/data/connections"
import { createEcho as createEchoData } from "~/data/echos"
import {
  addReaction,
  getReaction,
  updateReaction,
} from "~/data/reactions"
import { getUser, updateUser, isAdmin } from "~/data/users"

export type ActionResponse = {
  errors?: (string | undefined)[]
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
    isTest: isAdmin() ? !!formData.get("isTest") : false,
    idReceiver: id ?? idUser,
  }

  const doesUserExist = id ? await getUser(id) : true

  if (!doesUserExist)
    return { errors: ["user doesn't exist"], status: "failure" }

  const res = await createEchoData(rawFormData)

  if (res && "message" in res) return { errors: res.message, status: "failure" }

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
    image: formData.get("profile-picture"),
  }

  const image =
    rawFormData.image instanceof File ? rawFormData.image : undefined

  const interestsArray =
    rawFormData.interests?.split(",").filter((interest) => Boolean(interest)) ??
    []

  if (!rawFormData.username)
    return {
      errors: ["You must have a username"],
      status: "failure",
    }

  try {
    const user = await currentUser()
    const isUsernameSame = user?.username === rawFormData.username
    const isBioSame = user?.publicMetadata.bio === rawFormData.bio
    const isImageChosen = !!image

    const isInterestsSame =
      Array.isArray(user?.publicMetadata.interests) &&
      user?.publicMetadata.interests?.join(",") === interestsArray.join(",")
    const hasChange =
      !isUsernameSame || !isBioSame || !isInterestsSame || isImageChosen

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
      image: image,
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

export async function deleteFollow(id: string) {
  const { userId: idUser } = auth()

  if (idUser) await removeFollow(idUser, id)

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

export async function createReaction(idEcho: string, type: "agree" | "disagree") {
  const reaction = await getReaction(idEcho)

  if (reaction && "id" in reaction) {
    const result = await updateReaction({ idEcho, type })
    revalidatePath("/echo/[[...id]]", "page")

    if (result && "message" in result)
      return { errors: result.message, status: "failure" }
  } else {
    const result = await addReaction({ idEcho, type })
    revalidatePath("/echo/[[...id]]", "page")

    if (result && "message" in result)
      return { errors: result.message, status: "failure" }
  }
}
