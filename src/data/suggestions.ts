import "server-only"
import db from "~/db"
import validationErrorHandler from "./validationErrorHandler"
import {
  type Suggestion,
  insertSuggestionschema,
  suggestions,
} from "~/db/schema/suggestions"

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
