import Link from "next/link"
import { getEchos } from "~/data/echos"

export default async function EchoList() {
  const echos = await getEchos(0, undefined, true)

  return (
    <div className="grid gap-2">
      LIST OF ALL ECHOS
      {echos.map((echo) => {
        return (
          <div className="grid grid-cols-3 rounded-md bg-yellow-50 p-2">
            <Link
              className="col-span-2 hover:underline"
              href={`/echo/${echo.id}`}
            >
              {echo.idParent != null && "Reply to: "}
              {echo.title}
            </Link>
            <Link
              className="rounded-md bg-primary-dark p-1 text-white hover:bg-primary-light"
              href={`/profile/${echo.idSender}`}
            >
              User profile
            </Link>
            {new Date(echo.date ?? "").toDateString()}
          </div>
        )
      })}
    </div>
  )
}
