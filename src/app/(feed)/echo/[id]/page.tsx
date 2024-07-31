import Head from "~/app/components/head"
import { getEcho } from "~/data/echos"
import Post from "../../components/post"
import Comments from "../../components/comments"
import { getUser } from "~/data/users"
import { getTopic } from "~/data/topics"
import { getReaction } from "~/data/reactions"
import ReactionButtons from "../../components/reaction-buttons"

export default async function Echo({ params }: { params: { id?: string } }) {
  const id = params?.id ? parseInt(params?.id, 10) : null

  // TODO: do this nicer
  if (!id) return <div>Echo not found</div>

  const echo = await getEcho(id)
  const postedBy = echo?.idSender ? await getUser(echo?.idSender) : null
  const postedTo = echo?.idReceiver ? await getUser(echo?.idReceiver) : null
  const topic = echo?.idTopic ? await getTopic(echo?.idTopic) : null
  const topicName = topic?.text
  const reaction = echo?.id ? await getReaction(echo?.id.toString()) : null

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
        <>
          <ReactionButtons
            idEcho={echo?.id?.toString() ?? undefined}
            currentReaction={reaction?.type}
          />
          <Comments
            idUser={echo?.idSender}
            id={id}
            defaultTitle={`Reply to: ${echo?.title}`}
          />
        </>
      )}
    </>
  )
}
