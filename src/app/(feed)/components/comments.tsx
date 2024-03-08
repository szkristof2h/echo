import Link from "next/link"
import { getEchos } from "~/data/echos"

export default async function Comments(props: { id: number }) {
  const { id } = props

  const subEchos = await getEchos(0, id)
  const commentCount = subEchos.length

  return (
    <>
      <div>Comments ({commentCount})</div>
      <ul>
        {subEchos.map((subEcho) => (
          <li
            key={subEcho.id}
            className="backdrop-blur-m ml-4 mt-4 overflow-hidden bg-white/80 p-4 drop-shadow-lg"
          >
            <Link href={`/profile${subEcho.echodTo.id}`}>
              @{subEcho.echodTo.displayName}
            </Link>{" "}
            {subEcho.text}
          </li>
        ))}
      </ul>
    </>
  )
}
