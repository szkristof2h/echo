import { isAdmin } from "~/data/users"
import { redirect } from "next/navigation"
import { getSuggestions } from "~/data/suggestions"
import Link from "next/link"
import { getEchos } from "~/data/echos"

export default async function Admin() {
  const isUserAdmin = isAdmin()

  if (!isUserAdmin) redirect("/")

  const lastSuggestion = await getSuggestions(0, 1)
  const lastEcho = await getEchos(0, undefined, true, 10000)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Link href="admin/echos" className="button-primary">
          ECHOS
        </Link>
        <Link href="admin/suggestions" className="button-primary">
          SUGGESTIONS
        </Link>
      </div>
      LAST SUGGESTION:
      <div className="flex justify-between rounded-md bg-yellow-50 p-2">
        <span>{lastSuggestion[0]?.title}</span>
        <span>{new Date(lastSuggestion[0]?.date ?? "").toDateString()}</span>
      </div>
      LAST ECHO:
      <div className="flex justify-between rounded-md bg-yellow-50 p-2">
        <Link className="hover:underline" href={`/echo/${lastEcho[0]?.id}`}>
          {lastEcho[0]?.title}
        </Link>
        <span>{new Date(lastEcho[0]?.date ?? "").toDateString()}</span>
      </div>
    </div>
  )
}
