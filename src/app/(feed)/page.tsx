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
      <span className="bg-tertiary-dark mb-4 inline-block w-full p-4 text-center">
        This week's topic is {topic?.[0]?.text}
      </span>
      <Link href="/echoTo">
        <Button className="mb-8 inline-block w-full p-4">Write Echo</Button>
      </Link>
      <Posts posts={echos} />
    </>
  )
}
