import Head from "~/app/components/head"
import { getEcho } from "~/data/echos"
import Post from "../../components/post"
import Comments from "../../components/comments"

export default async function Home({ params }: { params: { id?: string } }) {
  const id = params?.id ? parseInt(params?.id, 10) : null

  // TODO: do this nicer
  if (!id) return <div>WWWW</div>

  const echo = await getEcho(id)

  return (
    <>
      <Head title={echo?.title ?? "..."} />
      {!!echo ? <Post {...echo} /> : "Couldn't load echo"}

      {echo && <Comments idUser={echo?.postedBy.id} id={id} />}
    </>
  )
}
