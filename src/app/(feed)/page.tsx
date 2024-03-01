import Head from "~/app/components/head"
import Posts from "./components/posts"
import { getEchos } from "~/data/echos"

export default async function Home() {
  const echos = await getEchos()

  return (
    <>
      <Head title="Echo" />
      <Posts posts={echos} />
    </>
  )
}
