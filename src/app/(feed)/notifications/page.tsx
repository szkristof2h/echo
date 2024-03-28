import Head from "~/app/components/head"
import Posts from "../components/posts"
import { getNotifications } from "~/data/echos"

export default async function Notifications() {
  const echos = await getNotifications()

  return (
    <>
      <Head title="Echo" />
      <span className="mb-4 inline-block bg-tertiary-dark p-4">
        New echos from your follows
      </span>
      {!echos || echos.length === 0 ? (
        "No notifications"
      ) : (
        <Posts posts={echos} />
      )}
    </>
  )
}
