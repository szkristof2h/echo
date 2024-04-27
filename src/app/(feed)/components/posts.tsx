import type { Echo } from "~/db/schema/echos"
import Post from "./post"
import { getUsers } from "~/data/users"

type Props = {
  posts: Echo[]
}

export default async function Posts(props: Props) {
  const { posts } = props

  const idSenders = posts?.map(({ idSender }) => idSender.toString())
  const idReceivers = posts?.map(({ idReceiver }) => idReceiver.toString())
  const users = await getUsers(
    Array.from(new Set([...idSenders, ...idReceivers])),
  )

  return (
    <div className="mb-16 flex flex-col gap-y-4">
      {posts.map((post) => {
        const { id, title, date, text, idSender, idReceiver, idTopic } = post
        const postedBy = users?.find((user) => user.id === idSender.toString())
        const postedTo = users?.find(
          (user) => user.id === idReceiver.toString(),
        )

        return (
          <Post
            key={id}
            id={id}
            idTopic={idTopic}
            title={title}
            date={date}
            text={text}
            postedBy={postedBy}
            postedTo={postedTo}
            idParent={null}
            isShort={true}
          />
        )
      })}
    </div>
  )
}
