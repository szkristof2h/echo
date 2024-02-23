import { NewUser, users } from "~/db/schema/users"
import db from "~/db"
import { eq } from "drizzle-orm"

export type CreateUserData = {
  displayName?: string
  bio?: string
}
export type UpdateUserData = {
  id?: number
} & CreateUserData

export async function createUser(user: CreateUserData) {
  const displayName = user?.displayName
  const bio = user?.bio

  if (!displayName) return { message: "No displayname" }

  console.log({ displayName, bio })
  try {
    const newUser: NewUser = { displayName, bio }
    const result = await db.insert(users).values(newUser)

    return result
  } catch (error) {
    return error
  }
}

export async function getUser(id: number) {
  console.log("should be at server")
  try {
    const user = await db.query.users.findFirst({ where: eq(users.id, id) })

    if (!user) return null

    return {
      id: user.id,
      displayName: user.displayName,
      bio: user.bio,
    }
  } catch (error) {
    console.error("Database error: failed getting user")
    console.error(error)
  }
}
export async function getCurrentUser() {
  //
  const id = 5

  return await getUser(id)
}
export async function updateUser(user: UpdateUserData) {}
export async function deleteUser(id: string) {}
