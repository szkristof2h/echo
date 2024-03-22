import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs"

// TODO: add return type? add route constant?

export async function GET(
  request: Request,
  context: { params: { name?: string } },
) {
  const name = context.params.name

  if (!name || name.length < 3)
    return NextResponse.json({ users: [] }, { status: 400 })

  try {
    const users = await clerkClient.users.getUserList({
      query: name,
    })

    const usersWithMatchedNames = users
      .filter((user) => user.username?.includes(name))
      .map(({ id, username }) => ({ id, username }))

    return NextResponse.json({ users: usersWithMatchedNames }, { status: 200 })
  } catch (error) {
    console.error("error get user route")
    console.error(error)
    return NextResponse.json({ users: [] }, { status: 400 })
  }
}
