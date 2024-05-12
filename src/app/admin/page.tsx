import { isAdmin } from "~/data/users"
import { redirect } from "next/navigation"
import { getSuggestions } from "~/data/suggestions"
import Link from "next/link"

export default async function Admin() {
  const isUserAdmin = isAdmin()
  const suggestions = await getSuggestions()

  if (!isUserAdmin) redirect("/")

  return (
    <div className="flex gap-4">
      <Link href="admin/echos" className="button-primary">
        ECHOS
      </Link>
      <Link href="admin/suggestions" className="button-primary">
        SUGGESTIONS
      </Link>
    </div>
  )
}
