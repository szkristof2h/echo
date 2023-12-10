import type { Post as PostType } from "."
import Post from "./post"

type Props = {
  posts: PostType[]
}

export default function Posts(props: Props) {
  const { posts } = props

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      {posts.map((post) => {
        const { id, title, date, text, postedByName, postedByLink } = post

        return (
          <Post
            key={id}
            id={id}
            title={title}
            date={date}
            text={text}
            postedByName={postedByName}
            postedByLink={postedByLink}
          />
        )
      })}
    </div>
  )
}
