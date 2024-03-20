import Link from "next/link"
import type { Post } from ".."
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
    <Container>
      <h1 className="mb-3 text-xl">
        <Link href={echoUrl}>
          {idParent ? "Reply to: " : ""}
          {title}
        </Link>
      </h1>
      <div className="max-h-40 overflow-hidden">{text}</div>
      <div className="flex justify-between text-sm">
        <span>
          {postedBy?.username ? (
            <ProfileLink idUser={postedBy.id} displayName={postedBy.username} />
          ) : (
            "..."
          )}
          {" > "}
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
