import Head from "~/app/components/head"
import Posts from "../../components/posts"
import { getEchosByTopic } from "~/data/echos"
import { getTopic } from "~/data/topics"
import Container from "~/app/components/container"
import { redirect } from "next/navigation"

export default async function EchosByTopic({
  params,
}: {
  params: { idTopic?: string }
}) {
  const id = params?.idTopic ? parseInt(params?.idTopic, 10) : null

  if (!id || typeof id !== "number") redirect("/")

  const echos = await getEchosByTopic(id)
  const topic = await getTopic(id)
  const topicName = topic?.text

  return (
    <>
      <Head title={`Echos of ${topicName}`} />
      <Container className="mb-4 text-center" theme="tertiary">
        {topicName ?? "Couldn't find the topic :("}
      </Container>
      <Posts posts={echos} />
    </>
  )
}
