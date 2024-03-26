import Link from "next/link"
import Container from "~/app/components/container"
import type { Echo } from "~/db/schema/echos"
import ProfileLink from "./profile-link"
import type { User } from "@clerk/nextjs/server"

type Props = Omit<Echo, "idSender" | "idUser"> & {
  postedBy?: Pick<User, "id" | "username" | "publicMetadata"> | null
  postedTo?: Pick<User, "id" | "username" | "publicMetadata"> | null
}

export default function Post(props: Props) {
  const { id, title, date, text, postedBy, postedTo, idParent } = props
  const echoUrl = `/echo/${id}`

  return (
    <Container
      title={
        <Link href={echoUrl}>
          {idParent ? "Reply to: " : ""}
          {title}
        </Link>
      }
    >
      <div className="mb-4 overflow-hidden">{text}</div>
      <div className="flex justify-between text-sm">
        <span>
          {postedBy?.username ? (
            <ProfileLink idUser={postedBy.id} displayName={postedBy.username} />
          ) : (
            "..."
          )}
          {" --> "}
          {postedTo?.username ? (
            <ProfileLink idUser={postedTo.id} displayName={postedTo.username} />
          ) : (
            "..."
          )}
        </span>
        <span>{new Date(date ?? "").toDateString()}</span>
      </div>
    </Container>
  )
}
