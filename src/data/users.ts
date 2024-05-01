import "server-only"
import { auth, clerkClient } from "@clerk/nextjs"

export async function getUser(id: string) {
  console.log("should be at server")

  try {
    const user = await clerkClient.users.getUser(id)

    if (!user) return null

    const { username, publicMetadata, imageUrl } = user

    return { id, username, publicMetadata, imageUrl }
  } catch (error) {
    console.error("Database error: failed getting user")
    console.error(error)
    return null
  }
}

export async function getUsers(ids: string[]) {
  console.log("should be at server")

  try {
    const users = await clerkClient.users.getUserList({
      userId: ids,
    })

    if (!users) return null

    return users.map(({ id, username, publicMetadata, imageUrl }) => ({
      id,
      username,
      publicMetadata,
      imageUrl,
    }))
  } catch (error) {
    console.error("Clerk error: failed getting users")
    console.error(error)
    return null
  }
}

export async function getCurrentUser() {
  const { userId } = auth()

  if (!userId) return null

  return await getUser(userId)
}

export async function updateUser(user: {
  id: string
  username: string
  bio?: string
  interests?: string[]
  image?: File
}) {
  const { id, username, bio, interests, image } = user

  try {
    if (!!image)
      await clerkClient.users.updateUserProfileImage(id, { file: image })

    await clerkClient.users.updateUser(id, {
      username,
      publicMetadata: {
        bio,
        interests,
      },
    })
  } catch (error) {
    console.error("Clerk error: failed updating profile")
    console.error(error)
  }
}

export function isAdmin() {
  const { userId: idUser } = auth()

  const idAdmins = [
    "user_2eZ8MjBNYvkxTyNAshC54WZxCRV",
    "user_2epS4QeONOgzdK8z2kwQZqFlgBo",
  ]

  return !!idUser && idAdmins.includes(idUser)
}
// export async function deleteUser(id: string) {}
