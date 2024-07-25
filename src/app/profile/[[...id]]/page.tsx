import Link from "next/link"
import Head from "~/app/components/head"
import { getUser, getCurrentUser } from "~/data/users"
import ConnectionButton from "./components/connection-button"
import { getConnection, getFollow } from "~/data/connections"
import { SignOutButton, auth } from "@clerk/nextjs"
import Container from "~/app/components/container"
import FollowButton from "./components/follow-button"
import { Button } from "~/app/components/button"
import Frame from "~/app/components/frame"

export default async function Profile({
  params,
}: {
  params: { id?: string[] }
}) {
  const id = params.id?.[0] ?? null
  const user = id ? await getUser(id) : await getCurrentUser()
  const { userId: idLoggedInUser } = auth()

  const isOwnProfile = id === idLoggedInUser
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
      <Container>
        <div className="grid grid-cols-3 gap-4">
          <Frame title={displayName} className="col-span-2 h-full">
            <img
              src={imageUrl}
              className="mx-auto h-44 w-44 rounded-full shadow-xl"
            ></img>
          </Frame>
          <div className="flex flex-col gap-4">
            {!isOwnProfile && id ? (
              <>
                <ConnectionButton
                  idConnection={id}
                  hasConnection={hasConnection}
                  isPending={isPending}
                />
                <FollowButton idConnection={id} isFollowing={isFollowing} />

                <Link className="button-primary" href={`/echoTo/${user?.id}`}>
                  Echo
                </Link>
              </>
            ) : (
              <>
                <Link href="/settings" className="button-primary">
                  Edit
                </Link>
                <Link href="/connections" className="button-primary">
                  Connections
                </Link>
              </>
            )}
          </div>
          <Frame title="Bio" className="col-span-3">
            {bio}
          </Frame>
          <Frame title="I like" className="col-span-3">
            <div className="flex flex-wrap gap-4">
              {interests.map((interest) => (
                <Container
                  className="shadow-sm"
                  theme="tertiary"
                  key={interest}
                >
                  {interest}
                </Container>
              ))}
            </div>
          </Frame>
          {!id && (
            <div className="col-span-3">
              <SignOutButton>
                <Button
                  buttonType="button"
                  theme="danger"
                  className="w-full"
                  iconName="exit"
                >
                  Sign out
                </Button>
              </SignOutButton>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
