import { NextResponse } from "next/server"
import db from "~/db"
import { users } from "~/db/schema/users"

type NewUser = typeof users.$inferInsert

export async function POST(request: Request) {
  try {
    const newUser: NewUser = { displayName: "Alef", bio: "yo, it's mi bio!" }
    const result = await db.insert(users).values(newUser)

    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
