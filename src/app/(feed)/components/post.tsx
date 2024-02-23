import Link from "next/link"
import type { Post } from ".."
import Container from "~/app/components/container"
import { EchoWithUser } from "~/db/schema/echos"

type Props = EchoWithUser

export default function Post(props: Props) {
  const { id, title, date, text, postedBy, echodTo } = props
  const echoUrl = `/echo/${id}`
  const postedByUrl = `/profile/${postedBy.id}`
  const echodToUrl = `/profile/${echodTo.id}`

  return (
    <Container>
      <h1 className="text-xl">
        <Link href={echoUrl}>{title}</Link>
      </h1>
      <div className="max-h-40 overflow-hidden">{text}</div>
      <div className="flex justify-between text-sm">
        <span>
          <Link href={postedByUrl}>{postedBy.displayName}</Link>
          {" > "}
          <Link href={echodToUrl}>{echodTo.displayName}</Link>
        </span>
        <span>{new Date(date ?? "").toDateString()}</span>
      </div>
    </Container>
  )
}
