import Link from "next/link"
import Head from "~/app/components/head"
import { getUser, getCurrentUser } from "~/data/users"
import ConnectionButton from "./components/connection-button"
import { getConnection, getFollow } from "~/data/connections"
import { SignOutButton } from "@clerk/nextjs"
import Container from "~/app/components/container"
import FollowButton from "./components/follow-button"

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
  const follow = id ? await getFollow(id) : null
  const hasConnection = !!connection ?? false
  const isFollowing = !!follow ?? false
  const isPending = connection?.isPending ?? false

  return (
    <>
      <Head title="Profile" />
      <div className="flex w-128 flex-col gap-4 p-0">
        <div className="flex items-center justify-between">
          <h2 className="h-16 w-full bg-secondary-dark p-4 text-xl text-white">
            {displayName}
          </h2>
          {id && (
            <div className="ml-4 flex gap-4">
              <ConnectionButton
                idConnection={id}
                hasConnection={hasConnection}
                isPending={isPending}
              />
              <FollowButton idConnection={id} isFollowing={isFollowing} />

              <Link
                className="flex h-16 w-full items-center bg-secondary-dark p-2 px-4 text-white hover:bg-secondary-light"
                href={`/echoTo/${user?.id}`}
              >
                echo
              </Link>
            </div>
          )}
        </div>
        <Container title="Bio:" theme="secondary">
          {bio}
        </Container>
        <Container theme="secondary" title="I like">
          <div className="flex flex-wrap gap-4">
            {interests.map((interest) => (
              <span
                className="bg-primary-dark p-4 text-slate-600"
                key={interest}
              >
                {interest}
              </span>
            ))}
          </div>
        </Container>
        {!id && (
          <SignOutButton>
            <span className="my-4 inline-block cursor-pointer bg-danger-light px-4 py-4 text-center text-xl text-white hover:bg-danger-dark">
              Sign out
            </span>
          </SignOutButton>
        )}
      </div>
    </>
  )
}
