import Link from "next/link"
import { getEchos } from "~/data/echos"
import FormWrapper from "./form-wrapper"

export default async function Comments(props: { id: number; idUser: number }) {
  const { id, idUser } = props

  const subEchos = await getEchos(0, id)
  const commentCount = subEchos.length

  return (
    <>
      <div className="mt-4">Comments ({commentCount})</div>
      <FormWrapper idUser={idUser} idParent={id} />
      <ul>
        {subEchos.map((subEcho) => (
          <li
            key={subEcho.id}
            className="backdrop-blur-m ml-8 mt-4 overflow-hidden bg-white/80 p-4 drop-shadow-lg"
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
