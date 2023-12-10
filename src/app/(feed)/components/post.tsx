import Link from "next/link"
import type { Post } from ".."
import Container from "~/app/components/container"

type Props = Post

export default function Post(props: Props) {
  const { id, title, date, text, postedByName, postedByLink } = props

  return (
    <Container>
      <h1>{title}</h1>
      <div>{date.toDateString()}</div>
      <Link href={postedByLink}>{postedByName}</Link>
      <div className="h-40 overflow-hidden">{text}</div>
    </Container>
  )
}
