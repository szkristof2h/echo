import Link from "next/link"
import type { Post } from "."

type Props = Post

export default function Post(props: Props) {
  const { id, title, date, text, postedByName, postedByLink } = props

  return (
    <div className="backdrop-blur-m h-64 w-64 overflow-hidden rounded-lg bg-white/30 p-4 text-slate-600 drop-shadow-lg backdrop-hue-rotate-15">
      <h1>{title}</h1>
      <div>{date.toDateString()}</div>
      <Link href={postedByLink}>{postedByName}</Link>
      <div className="h-40 overflow-hidden">{text}</div>
    </div>
  )
}
