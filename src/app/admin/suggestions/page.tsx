import { getSuggestions } from "~/data/suggestions"

export default async function SuggestionList() {
  const suggestions = await getSuggestions()

  return (
    <div className="grid gap-4">
      LIST OF ALL SUGGESTIONS
      {suggestions.map((suggestion) => {
        return (
          <div className="grid grid-cols-4 gap-2 rounded-md bg-yellow-50 p-2">
            Title:
            <div className="col-span-3">{suggestion.title}</div>
            Date:
            <div className="col-span-3">
              {new Date(suggestion.date ?? "").toDateString()}
            </div>
            Analysis:
            <div className="col-span-3">{suggestion.analysis}</div>
            Filter:
            <div className="col-span-3">{suggestion.filter}</div>
            Suggestion:
            <div className="col-span-3">{suggestion.suggestion}</div>
            Text:
            <div className="col-span-3">{suggestion.text}</div>
          </div>
        )
      })}
    </div>
  )
}
