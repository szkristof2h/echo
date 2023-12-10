import Link from "next/link"

type Props = {
  id: string
  name: string
  date: Date
  text: string
  postedByName: string
  postedByLink: string
}

export default function Post(props: Props) {
  const { id, name, date, text, postedByName, postedByLink } = props

  return (
    <div className="h-64 w-64 overflow-hidden rounded bg-white p-4">
      <h1>{name}</h1>
      <div>{date.toDateString()}</div>
      <Link href={postedByLink}>{postedByName}</Link>
      <div className="text-ellipsis">{text}</div>
    </div>
  )
}
