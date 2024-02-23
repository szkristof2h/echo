import { EchoWithUser } from "~/db/schema/echos"
import Post from "./post"

type Props = {
  posts: EchoWithUser[]
}

export default function Posts(props: Props) {
  const { posts } = props

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      {posts.map((post) => {
        const { id, title, date, text, postedBy, echodTo } = post

        return (
          <Post
            key={id}
            id={id}
            title={title}
            date={date}
            text={text}
            postedBy={postedBy}
            echodTo={echodTo}
          />
        )
      })}
    </div>
  )
}
