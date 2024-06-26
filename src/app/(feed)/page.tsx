import Head from "~/app/components/head"
import Posts from "./components/posts"
import { getEchos } from "~/data/echos"
import { getCurrentTopic } from "~/data/topics"
import { Button } from "~/app/components/button"
import Link from "next/link"
import Container from "~/app/components/container"

export default async function Home() {
  const echos = await getEchos()
  const topic = await getCurrentTopic()

  return (
    <>
      <Head title="Echo" />
      <Container className="mb-4 text-center" theme="tertiary">
        This week's topic is {topic?.[0]?.text}
      </Container>
      <Link href="/echoTo">
        <Button iconName="pencil" theme="rainbow" className="mb-4 w-full">
          Break the Echo with our new guide, Echo Breaker!
        </Button>
      </Link>
      <Posts posts={echos} />
    </>
  )
}
