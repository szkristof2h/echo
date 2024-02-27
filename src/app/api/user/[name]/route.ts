import { NextResponse } from "next/server"
import { ilike } from "drizzle-orm"
import { users } from "~/db/schema/users"
import db from "~/db"

export async function GET(
  request: Request,
  context: { params: { name?: string } },
) {
  const name = context.params.name

  if (!name || name.length < 3) return NextResponse.json(null, { status: 400 })

  const matchedUsers = await db
    .select({
      id: users.id,
      displayName: users.displayName,
    })
    .from(users)
    .where(ilike(users.displayName, `%${name}%`))
    .limit(5)

  return NextResponse.json({ users: matchedUsers }, { status: 200 })
}
