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
  const imageUrl = user?.imageUrl ?? ""
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
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Container title={displayName} className="h-full">
              <img
                src={imageUrl}
                className="mx-auto my-4 h-40 w-auto rounded-full shadow-xl"
              ></img>
            </Container>
          </div>
          <div className="flex flex-col gap-4">
            {id ? (
              <>
                <ConnectionButton
                  idConnection={id}
                  hasConnection={hasConnection}
                  isPending={isPending}
                />
                <FollowButton idConnection={id} isFollowing={isFollowing} />

                <Link className="button" href={`/echoTo/${user?.id}`}>
                  echo
                </Link>
              </>
            ) : (
              <>
                <Link href="/settings" className="button">
                  edit
                </Link>
                <Link href="/connections" className="button">
                  connections
                </Link>
              </>
            )}
          </div>
        </div>
        <Container title="Bio" theme="primary">
          {bio}
        </Container>
        <Container theme="primary" title="I like">
          <div className="flex flex-wrap gap-4">
            {interests.map((interest) => (
              <Container className="shadow-sm" theme="tertiary" key={interest}>
                {interest}
              </Container>
            ))}
          </div>
        </Container>
        {!id && (
          <SignOutButton>
            <span className="bg-danger-light hover:bg-danger-dark inline-block cursor-pointer rounded-lg px-4 py-4 text-center text-xl text-white">
              Sign out
            </span>
          </SignOutButton>
        )}
      </div>
    </>
  )
}
