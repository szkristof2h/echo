import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { userId: idUser } = auth()

  if (!idUser)
    return NextResponse.json("Please login.", {
      status: 401,
    })

  const res = (await request.json()) as unknown

  if (
    !!res &&
    typeof res === "object" &&
    "title" in res &&
    "text" in res &&
    !!res.title &&
    typeof res.title === "string" &&
    !!res.text &&
    typeof res.text === "string"
  ) {
    try {
      const body = JSON.stringify({
        text: `title: ${res.title}\n${res.text}`,
      })

      const resSuggestion = await fetch(
        "https://echo-breaker-production.up.railway.app/suggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.ECHO_BREAKER_API_KEY!,
          },
          body,
        },
      )

      const data = (await resSuggestion.json()) as unknown

      if (
        !!data &&
        typeof data === "object" &&
        "suggestion" in data &&
        !!data.suggestion &&
        typeof data.suggestion === "object" &&
        "content" in data.suggestion &&
        typeof data.suggestion.content === "string"
      ) {
        const content = JSON.parse(data.suggestion.content) as unknown

        if (
          !!content &&
          typeof content === "object" &&
          "suggestion" in content &&
          !!content.suggestion &&
          typeof content.suggestion === "string"
        )
          return NextResponse.json(content.suggestion)
      }

      NextResponse.json("Unfortunately the request run into an error.", {
        status: 400,
      })
    } catch (error) {
      console.error("Error", error)
      return NextResponse.json("Unfortunately the request run into an error.", {
        status: 400,
      })
    }
  } else
    return NextResponse.json("Unfortunately the request run into an error.", {
      status: 400,
    })
}
