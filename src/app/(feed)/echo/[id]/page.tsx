import Head from "~/app/components/head"
import { getEcho } from "~/data/echos"
import Post from "../../components/post"
import Comments from "../../components/comments"
import { getUser } from "~/data/users"

export default async function Home({ params }: { params: { id?: string } }) {
  const id = params?.id ? parseInt(params?.id, 10) : null

  // TODO: do this nicer
  if (!id) return <div>WWWW</div>

  const echo = await getEcho(id)
  const postedBy = echo?.idSender ? await getUser(echo?.idSender) : null
  const postedTo = echo?.idUser ? await getUser(echo?.idUser) : null

  return (
    <>
      <Head title={echo?.title ?? "..."} />
      {!!echo ? (
        <Post postedBy={postedBy} postedTo={postedTo} {...echo} />
      ) : (
        "Couldn't load echo"
      )}

      {echo && <Comments idUser={echo?.idSender} id={id} />}
    </>
  )
}
