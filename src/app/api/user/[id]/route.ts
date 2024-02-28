import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { users } from "~/db/schema/users"
import db from "~/db"

export async function GET(
  request: Request,
  context: { params: { id?: number } },
) {
  const id = context.params.id

  if (!id) return NextResponse.json({ user: null }, { status: 400 })

  try {
    const matchedUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    })

    return NextResponse.json({ users: matchedUser }, { status: 200 })
  } catch (error) {
    console.error("error get user route")
    console.error(error)
    return NextResponse.json({ user: null }, { status: 400 })
  }
}
