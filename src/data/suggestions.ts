import "server-only"
import db from "~/db"
import validationErrorHandler from "./validationErrorHandler"
import {
  type Suggestion,
  insertSuggestionschema,
  suggestions,
} from "~/db/schema/suggestions"
import { desc } from "drizzle-orm"

export async function createSuggestion(data: Omit<Suggestion, "id" | "date">) {
  const idUser = data.idUser
  const title = data.title
  const analysis = data.analysis
  const filter = data.filter
  const suggestion = data.suggestion
  const text = data.text

  try {
    const validatedSuggestion = insertSuggestionschema.parse({
      idUser,
      title,
      analysis,
      filter,
      suggestion,
      text,
    })

    await db.insert(suggestions).values(validatedSuggestion)
  } catch (error) {
    console.error("Database error: failed suggestion creation")

    validationErrorHandler(error)
  }
}

export async function getSuggestions(offset = 0) {
  try {
    const suggestionsByDate = await db.query.suggestions.findMany({
      orderBy: [desc(suggestions.date)],
      limit: 100,
      offset,
    })

    return suggestionsByDate
  } catch (error) {
    console.error("Database error: getting suggestions")
    console.error(error)

    return []
  }
}
