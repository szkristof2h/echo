import Link from "next/link"
import type { Post } from ".."
import Container from "~/app/components/container"
import { EchoWithUser } from "~/db/schema/echos"

type Props = EchoWithUser

export default function Post(props: Props) {
  const { id, title, date, text, postedBy, echodTo } = props
  const url = `/profile${postedBy.id}`

  return (
    <Container>
      <h1>{title}</h1>
      <div>{new Date(date ?? "").toDateString()}</div>
      <Link href={url}>{postedBy.displayName}</Link>
      <div className="h-40 overflow-hidden">{text}</div>
    </Container>
  )
}
