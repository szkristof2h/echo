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
      <h1 className="text-xl">{title}</h1>
      <div className="max-h-40 overflow-hidden">{text}</div>
      <div className="flex justify-between text-sm">
        <span>
          <Link href={url}>{postedBy.displayName}</Link>
          {" > "}
          <Link href={url}>{echodTo.displayName}</Link>
        </span>
        <span>{new Date(date ?? "").toDateString()}</span>
      </div>
    </Container>
  )
}
