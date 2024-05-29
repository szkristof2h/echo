import Link from "next/link"
import Container from "~/app/components/container"
import type { Echo } from "~/db/schema/echos"
import ProfileLink from "./profile-link"
import type { User } from "@clerk/nextjs/server"
import Icon from "~/app/components/icons"
import { Tag } from "~/app/components/tag"
import { Linkify } from "~/app/components/linkify"

type Props = Omit<Echo, "idSender" | "idReceiver" | "isTest"> & {
  postedBy?: Pick<
    User,
    "id" | "username" | "publicMetadata" | "imageUrl"
  > | null
  postedTo?: Pick<
    User,
    "id" | "username" | "publicMetadata" | "imageUrl"
  > | null
} & { isShort?: boolean; topic?: string }

export default function Post(props: Props) {
  const {
    id,
    title,
    date,
    text,
    postedBy,
    postedTo,
    idParent,
    isShort,
    idTopic,
    topic,
    replyCount,
  } = props
  const echoUrl = `/echo/${id}`
  const topicUrl = `/echos/${idTopic}`

  return (
    <Container
      title={
        <div className="flex flex-col gap-2">
          <Link href={echoUrl}>
            {idParent ? "Reply to: " : ""}
            {title}
          </Link>
          {topic && (
            <Link href={topicUrl}>
              <Tag>{topic}</Tag>
            </Link>
          )}
        </div>
      }
    >
      <div className={`mb-4  ${isShort ? "line-clamp-[10]" : ""}`}>
        <Linkify>{text}</Linkify>
      </div>
      <div className="flex justify-between text-sm">
        <span>
          {postedBy?.username ? (
            <ProfileLink
              idUser={postedBy.id}
              imageUrl={postedBy.imageUrl}
              displayName={postedBy.username}
            />
          ) : (
            "..."
          )}
          {postedBy?.id !== postedTo?.id && " --> "}
          {postedBy?.id === postedTo?.id ? (
            ""
          ) : postedTo?.username ? (
            <ProfileLink
              idUser={postedTo.id}
              imageUrl={postedTo.imageUrl}
              displayName={postedTo.username}
            />
          ) : (
            "..."
          )}
        </span>
        <span className="ml-auto mr-4 flex items-center">
          <Icon iconName="calendar" className="inline-block" isDark={true} />
          <span className="ml-2">{new Date(date ?? "").toDateString()}</span>
        </span>
        <span className="flex items-center">
          <Icon
            iconName="speech-bubble"
            className="inline-block"
            isDark={true}
          />
          <span className="ml-2">{replyCount}</span>
        </span>
      </div>
    </Container>
  )
}
