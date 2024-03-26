import Link from "next/link"
import Container from "~/app/components/container"
import Head from "~/app/components/head"

export default function Goodbye() {
  return (
    <>
      <Head title="Goodbye" />
      <Container>
        <h1>Goodbye</h1>
        <p>
          Understandable, in that case here are some passive aggressive
          reccomendations in that case
        </p>

        <Link
          href="/welcome/0"
          className="ml-auto mr-4 inline-block cursor-pointer bg-emerald-400 px-4 py-2 text-white hover:underline"
        >
          On a second thought...
        </Link>
        <Link
          href="https://facebook.com"
          className="ml-auto mr-4 inline-block cursor-pointer bg-blue-400 px-4 py-2 text-white hover:underline"
        >
          Facebook, the site we can trust with our data!
        </Link>
        <Link
          href="https://reddit.com"
          className="ml-auto mr-4 inline-block cursor-pointer bg-orange-400 px-4 py-2 text-white hover:underline"
        >
          Reddit, where AI doesn't steal my content
        </Link>
        <Link
          href="https://tiktok.com"
          className="ml-auto mr-4 inline-block cursor-pointer bg-slate-800 px-4 py-2 text-white hover:underline"
        >
          TikTok, attention span is overrated!
        </Link>
      </Container>
    </>
  )
}
