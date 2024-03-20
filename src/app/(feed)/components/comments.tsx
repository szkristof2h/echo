import Link from "next/link"
import { getEchos } from "~/data/echos"
import FormWrapper from "./form-wrapper"
import ProfileLink from "./profile-link"
import { getUsers } from "~/data/users"

export default async function Comments(props: { id: number; idUser: string }) {
  const { id, idUser } = props

  const subEchos = await getEchos(0, id)
  const commentCount = subEchos.length
  const idReceivers = subEchos?.map(({ idUser }) => idUser.toString())
  const users = await getUsers(Array.from(new Set([...idReceivers])))

  return (
    <>
      <div className="mt-4">Comments ({commentCount})</div>
      <FormWrapper idUser={idUser} idParent={id} />
      <ul>
        {subEchos.map((subEcho) => {
          const postedTo = users?.find((user) => user.id === idUser.toString())
          return (
            <Link href={`/echo/${subEcho.id}`}>
              <li
                key={subEcho.id}
                className="backdrop-blur-m ml-8 mt-4 overflow-hidden bg-white/80 p-4 drop-shadow-lg"
              >
                {postedTo?.username && (
                  <ProfileLink
                    idUser={postedTo.id}
                    displayName={postedTo.username}
                  />
                )}{" "}
                {subEcho.text}
              </li>
            </Link>
          )
        })}
      </ul>
    </>
  )
}
