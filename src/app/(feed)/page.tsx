import Head from "~/app/components/head"
import Posts from "./components/posts"
import { getEchos } from "~/data/echos"
import { getCurrentTopic } from "~/data/topics"
import { Button } from "~/app/components/button"
import Link from "next/link"

export default async function Home() {
  const echos = await getEchos()
  const topic = await getCurrentTopic()

  return (
    <>
      <Head title="Echo" />
      <span className="mb-4 inline-block bg-tertiary-dark p-4">
        This week's topic is {topic?.[0]?.text}
      </span>
      <Link href="/echoTo">
        <Button className="inline-block w-32 p-4">Write</Button>
      </Link>
      <Posts posts={echos} />
    </>
  )
}
