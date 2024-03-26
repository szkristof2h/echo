import Head from "~/app/components/head"
import Posts from "./components/posts"
import { getEchos } from "~/data/echos"
import { getCurrentTopic } from "~/data/topics"

export default async function Home() {
  const echos = await getEchos()
  const topic = await getCurrentTopic()

  return (
    <>
      <Head title="Echo" />
      <div className="bg-tertiary-dark mb-4 p-4">
        This week's topic is {topic?.[0]?.text}
      </div>
      <Posts posts={echos} />
    </>
  )
}
