import Head from "~/app/components/head"
import { getEcho } from "~/data/echos"
import Post from "../../components/post"
import Comments from "../../components/comments"
import { getUser } from "~/data/users"
import { getTopic } from "~/data/topics"

export default async function Home({ params }: { params: { id?: string } }) {
  const id = params?.id ? parseInt(params?.id, 10) : null

  // TODO: do this nicer
  if (!id) return <div>WWWW</div>

  const echo = await getEcho(id)
  const postedBy = echo?.idSender ? await getUser(echo?.idSender) : null
  const postedTo = echo?.idReceiver ? await getUser(echo?.idReceiver) : null
  const topic = echo?.idTopic ? await getTopic(echo?.idTopic) : null
  const topicName = topic?.text

  return (
    <>
      <Head title={echo?.title ?? "..."} />
      {!!echo ? (
        <Post
          postedBy={postedBy}
          postedTo={postedTo}
          topic={topicName}
          {...echo}
        />
      ) : (
        "Couldn't load echo"
      )}

      {echo && (
        <Comments
          idUser={echo?.idSender}
          id={id}
          defaultTitle={`Reply to: ${echo?.title}`}
        />
      )}
    </>
  )
}
