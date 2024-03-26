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
      <div className="flex w-128 flex-col gap-4 p-0">
        <div className="flex items-center justify-between ">
          <h2 className="mr-4 flex h-16 w-full items-center bg-emerald-100 px-4 text-xl">
            {displayName}
          </h2>
          {id && (
            <div className="flex gap-4">
              <ConnectionButton
                idConnection={id}
                hasConnection={hasConnection}
                isPending={isPending}
              />

              <Link
                className="flex h-16 cursor-pointer items-center bg-emerald-700  px-4 text-white hover:bg-emerald-600"
                href={`/echoTo/${user?.id}`}
              >
                echo
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="bg-emerald-700 p-4 text-xl text-white">Bio:</h2>
          <div className="bg-emerald-600 p-4 text-white ">{bio}</div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="bg-emerald-700 p-4 text-xl text-white">I like:</h2>
          <div className="flex flex-wrap gap-4 bg-emerald-600 p-4">
            {interests.map((interest) => (
              <span className="bg-emerald-200 p-4" key={interest}>
                {interest}
              </span>
            ))}
          </div>
        </div>
        {!id && (
          <SignOutButton>
            <span className="mt-4 inline-block cursor-pointer rounded bg-slate-400 px-4 py-2 hover:bg-slate-300">
              Sign out
            </span>
          </SignOutButton>
        )}
      </div>
    </>
  )
}
