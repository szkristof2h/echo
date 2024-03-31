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
          <h2 className="bg-secondary-dark h-16 w-full p-4 text-xl text-white">
            {displayName}
          </h2>
          <div className="ml-4 flex gap-4">
            {id ? (
              <>
                <ConnectionButton
                  idConnection={id}
                  hasConnection={hasConnection}
                  isPending={isPending}
                />
                <FollowButton idConnection={id} isFollowing={isFollowing} />

                <Link
                  className="bg-secondary-dark hover:bg-secondary-light flex h-16 w-full items-center p-2 px-4 text-white"
                  href={`/echoTo/${user?.id}`}
                >
                  echo
                </Link>
              </>
            ) : (
              <Link
                href="/settings"
                className="bg-secondary-dark hover:bg-secondary-light flex h-16 items-center p-2 px-4 text-center text-white"
              >
                Edit profile
              </Link>
            )}
          </div>
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
            <span className="bg-danger-light hover:bg-danger-dark my-4 inline-block cursor-pointer px-4 py-4 text-center text-xl text-white">
              Sign out
            </span>
          </SignOutButton>
        )}
      </div>
    </>
  )
}
