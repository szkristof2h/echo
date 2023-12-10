import Link from "next/link"
import type { Post } from ".."

type Props = Post

export default function Post(props: Props) {
  const { id, title, date, text, postedByName, postedByLink } = props

  return (
    <div className="backdrop-blur-m w-128 h-64 overflow-hidden bg-white/80 p-4 drop-shadow-lg">
      <h1>{title}</h1>
      <div>{date.toDateString()}</div>
      <Link href={postedByLink}>{postedByName}</Link>
      <div className="h-40 overflow-hidden">{text}</div>
    </div>
  )
}
