import Link from "next/link"
import type { Post } from ".."
import Container from "~/app/components/container"
import type { EchoWithUser } from "~/db/schema/echos"
import ProfileLink from "./profile-link"

type Props = EchoWithUser

export default function Post(props: Props) {
  const { id, title, date, text, postedBy, echodTo } = props
  const echoUrl = `/echo/${id}`

  return (
    <Container>
      <h1 className="mb-3 text-xl">
        <Link href={echoUrl}>{title}</Link>
      </h1>
      <div className="max-h-40 overflow-hidden">{text}</div>
      <div className="flex justify-between text-sm">
        <span>
          <ProfileLink
            idUser={postedBy.id}
            displayName={postedBy.displayName}
          />
          {" > "}
          <ProfileLink idUser={echodTo.id} displayName={echodTo.displayName} />
        </span>
        <span>{new Date(date ?? "").toDateString()}</span>
      </div>
    </Container>
  )
}
