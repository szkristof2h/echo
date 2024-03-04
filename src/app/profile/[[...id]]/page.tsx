import Container from "../../components/container"
import Link from "next/link"
import Head from "~/app/components/head"
import { getUser, getCurrentUser } from "~/data/users"
import ConnectionButton from "./components/connectionButton"
import { getConnection } from "~/data/connections"

const user2 = {
  interests: ["asdasd", "asdas", "dnrfgnwenfji", "erngtyernf"],
  hasConnections: false,
}

export default async function Profile({
  params,
}: {
  params: { id?: string[] }
}) {
  const id = params.id?.[0] ?? null
  const user = id ? await getUser(parseInt(id, 10)) : await getCurrentUser()
  const displayName = user?.displayName ?? ""
  const bio = user?.bio ?? ""
  const connection = await getConnection(2, 12)
  const hasConnection = !!connection?.date ?? false
  const isPending = connection?.isPending ?? false

  const { interests } = user2
  return (
    <>
      <Head title="Profile" />
      <Container>
        <div className="flex border-b border-slate-600">
          <h2 className="inline-block">{displayName}</h2>
          <ConnectionButton
            hasConnection={hasConnection}
            isPending={isPending}
          />
          <Link
            className="ml-4 inline-block cursor-pointer hover:underline"
            href={`/echoTo/${user?.id}`}
          >
            echo
          </Link>
        </div>
        <div className="mb-4 border-b border-slate-600 py-4">{bio}</div>
        <div>
          I like:{" "}
          {interests.map((interest) => (
            <span key={interest}>{interest}, </span>
          ))}
        </div>
      </Container>
    </>
  )
}
