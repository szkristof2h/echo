import Head from "~/app/components/head"
import { getEcho } from "~/data/echos"
import Post from "../../components/post"

export default async function Home({ params }: { params: { id?: number } }) {
  const id = params.id

  // TODO: do this nicer
  if (!id) return <div>WWWW</div>

  const echo = await getEcho(id)

  return (
    <>
      <Head title={echo?.title ?? "..."} />
      {!!echo ? <Post {...echo} /> : "Couldn't load echo"}
    </>
  )
}
