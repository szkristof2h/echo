import type { Echo } from "~/db/schema/echos"
import Post from "./post"
import { getUsers } from "~/data/users"

type Props = {
  posts: Echo[]
}

export default async function Posts(props: Props) {
  const { posts } = props

  const idSenders = posts?.map(({ idSender }) => idSender.toString())
  const idReceivers = posts?.map(({ idUser }) => idUser.toString())
  const users = await getUsers(
    Array.from(new Set([...idSenders, ...idReceivers])),
  )

  return (
    <div className="flex flex-col gap-y-4">
      {posts.map((post) => {
        const { id, title, date, text, idSender, idUser } = post
        const postedBy = users?.find((user) => user.id === idSender.toString())
        const postedTo = users?.find((user) => user.id === idUser.toString())

        return (
          <Post
            key={id}
            id={id}
            title={title}
            date={date}
            text={text}
            postedBy={postedBy}
            postedTo={postedTo}
            idParent={null}
          />
        )
      })}
    </div>
  )
}
