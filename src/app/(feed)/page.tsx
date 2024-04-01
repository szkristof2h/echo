import Head from "~/app/components/head"
import Posts from "./components/posts"
import { getEchos } from "~/data/echos"
import { getCurrentTopic } from "~/data/topics"
import { Button } from "~/app/components/button"
import Link from "next/link"
import Container from "../components/container"

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
        <Button className="mb-8 inline-block w-full p-4">Write Echo</Button>
      </Link>
      <Posts posts={echos} />
    </>
  )
}
