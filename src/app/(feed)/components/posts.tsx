import type { Echo } from "~/db/schema/echos"
import Post from "./post"
import { getUsers } from "~/data/users"
import { getTopics } from "~/data/topics"

type Props = {
  posts: Echo[]
}

export default async function Posts(props: Props) {
  const { posts } = props

  const idSenders = posts?.map(({ idSender }) => idSender.toString())
  const idReceivers = posts?.map(({ idReceiver }) => idReceiver.toString())
  const idTopics = posts
    ?.map(({ idTopic }) => idTopic)
    .filter((topic): topic is number => typeof topic === "number")
  const users = await getUsers(
    Array.from(new Set([...idSenders, ...idReceivers])),
  )
  const topics = idTopics.length > 0 ? await getTopics(idTopics) : []

  return (
    <div className="mb-16 flex flex-col gap-y-4">
      {posts.length === 0 && "Couldn't find any echos :("}
      {posts.map((post) => {
        const {
          id,
          title,
          date,
          text,
          idSender,
          idReceiver,
          idTopic,
          replyCount,
        } = post
        const postedBy = users?.find((user) => user.id === idSender.toString())
        const postedTo = users?.find(
          (user) => user.id === idReceiver.toString(),
        )
        const topic = topics?.find((topic) => topic.id === idTopic)
        const topicName = topic?.text

        return (
          <Post
            key={id}
            id={id}
            idTopic={idTopic}
            topic={topicName}
            title={title}
            date={date}
            text={text}
            postedBy={postedBy}
            postedTo={postedTo}
            idParent={null}
            isShort={true}
            replyCount={replyCount}
          />
        )
      })}
    </div>
  )
}
