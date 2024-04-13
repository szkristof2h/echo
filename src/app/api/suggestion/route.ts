import { NextResponse } from "next/server"

export async function POST() {
  try {
    const res = await fetch("https://echo-breaker-production.up.railway.app/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.ECHO_BREAKER_API_KEY!,
      },
    })

    const data = await res.json()
    console.log("data")
    console.log(data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error", error)
    return NextResponse.json({ users: [] }, { status: 400 })
  }
}
