import Head from "~/app/components/head"
import Posts from "../components/posts"
import { getNotifications } from "~/data/echos"
import Container from "~/app/components/container"

export default async function Notifications() {
  const echos = await getNotifications()

  return (
    <>
      <Head title="Echo" />
      <div className="flex flex-col items-center gap-4">
        <Container theme="tertiary" className="w-full text-center">
          New echos from your follows
        </Container>
        {!echos || echos.length === 0 ? (
          <Container className="w-full">No notifications</Container>
        ) : (
          <Posts posts={echos} />
        )}
      </div>
    </>
  )
}
