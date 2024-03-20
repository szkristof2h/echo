import Container from "../../components/container"
import Link from "next/link"
import Head from "~/app/components/head"
import { getUser, getCurrentUser } from "~/data/users"
import ConnectionButton from "./components/connection-button"
import { getConnection } from "~/data/connections"
import { SignOutButton } from "@clerk/nextjs"

export default async function Profile({
  params,
}: {
  params: { id?: string[] }
}) {
  const id = params.id?.[0] ?? null
  const user = id ? await getUser(id) : await getCurrentUser()
  const displayName = user?.username ?? ""
  const bio = (user?.publicMetadata?.bio as string | undefined) ?? ""
  const interests =
    (user?.publicMetadata?.interests as string[] | undefined) ?? []
  const connection = id ? await getConnection(id) : null
  const hasConnection = !!connection?.date ?? false
  const isPending = connection?.isPending ?? false

  return (
    <>
      <Head title="Profile" />
      <Container>
        <div className="flex border-b border-slate-600">
          <h2 className="inline-block">{displayName}</h2>
          {id && (
            <ConnectionButton
              idConnection={id}
              hasConnection={hasConnection}
              isPending={isPending}
            />
          )}
          {id && (
            <Link
              className="ml-4 inline-block cursor-pointer hover:underline"
              href={`/echoTo/${user?.id}`}
            >
              echo
            </Link>
          )}
        </div>
        <div className="mb-4 border-b border-slate-600 py-4">{bio}</div>
        <div>
          I like:{" "}
          {interests.map((interest) => (
            <span key={interest}>{interest}, </span>
          ))}
        </div>
        <SignOutButton>
          <span className="mt-4 inline-block cursor-pointer rounded bg-slate-400 px-4 py-2 hover:bg-slate-300">
            Sign out
          </span>
        </SignOutButton>
      </Container>
    </>
  )
}
