import Head from "~/app/components/head"
import Posts from "../components/posts"
import { getNotifications } from "~/data/echos"

export default async function Notifications() {
  const echos = await getNotifications()

  return (
    <>
      <Head title="Echo" />
      <div className="flex flex-col items-center gap-4">
        <h1 className="bg-tertiary-dark w-full p-4 text-center">
          New echos from your follows
        </h1>
        {!echos || echos.length === 0 ? (
          <span className="bg-secondary-dark w-full p-4 text-center text-white">
            No notifications
          </span>
        ) : (
          <Posts posts={echos} />
        )}
      </div>
    </>
  )
}
