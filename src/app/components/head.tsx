import NextHead from "next/head"

type Props = {
  title: string
  content?: string
}

export default function Head(props: Props) {
  const content = props.content ?? "content something"

  return (
    <NextHead>
      <title>Echo - {props.title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}
