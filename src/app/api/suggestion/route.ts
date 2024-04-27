import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { createSuggestion } from "~/data/suggestions"

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
    typeof res.text === "string" &&
    process.env.ECHO_BREAKER_URL
  ) {
    const title = res.title
    const text = res.text

    try {
      const body = JSON.stringify({
        text: `title: ${title}\n${text}`,
      })

      const resSuggestion = await fetch(
        `${process.env.ECHO_BREAKER_URL}/suggestion`,
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
          "analysis" in content &&
          "filter" in content &&
          "suggestion" in content &&
          !!content.analysis &&
          !!content.filter &&
          !!content.suggestion &&
          typeof content.analysis === "string" &&
          typeof content.filter === "string" &&
          typeof content.suggestion === "string"
        ) {
          const { analysis, filter, suggestion } = content

          try {
            await createSuggestion({
              analysis,
              filter,
              suggestion,
              title,
              text,
              idUser,
            })
          } catch (error) {
            console.error("Database error: failed suggestion creation at route")
          }

          return NextResponse.json(suggestion)
        }
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
