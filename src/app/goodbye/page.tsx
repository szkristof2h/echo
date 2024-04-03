import Link from "next/link"
import Container from "~/app/components/container"
import Head from "~/app/components/head"

export default function Goodbye() {
  return (
    <>
      <Head title="Goodbye" />
      <Container className="" title="Goodbye">
        <div className="flex flex-col gap-4">
          <p>
            Understandable, in that case here are some passive aggressive
            reccomendations in that case:
          </p>
          <Link href="/welcome/0" className="button-primary">
            On a second thought...
          </Link>
          <Link
            href="https://facebook.com"
            className="button-primary bg-blue-600 hover:from-blue-600 hover:to-blue-800"
          >
            Facebook, the site we can trust with our data!
          </Link>
          <Link
            href="https://reddit.com"
            className="button-primary bg-orange-400 hover:from-orange-400 hover:to-orange-600"
          >
            Reddit, where AI doesn't steal my content
          </Link>
          <Link
            href="https://tiktok.com"
            className="button-primary bg-slate-700 hover:from-slate-700 hover:to-slate-900"
          >
            TikTok, attention span is overrated!
          </Link>
        </div>
      </Container>
    </>
  )
}
