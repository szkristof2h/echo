export default function (error: unknown) {
  if (error && typeof error === "object" && "issues" in error)
    if (Array.isArray(error.issues)) {
      const issues: unknown[] = error.issues

      return issues
        .map((e) => {
          console.error("--------- VALIDATION ERROR ---------")
          if (e && typeof e === "object" && "message" in e) {
            console.error(e?.message)

            if (typeof e.message === "string") return e.message
          }
          if (e && typeof e === "object" && "path" in e) console.error(e?.path)
        })
        .filter(Boolean)
    }
}
