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
      <FormWrapper idUser={idUser} idParent={id} />
      <div className="text-bold mt-4 text-xl">Comments ({commentCount})</div>
      <ul>
        {subEchos.map((subEcho) => {
          const postedTo = users?.find((user) => user.id === idUser.toString())
          return (
            <Link href={`/echo/${subEcho.id}`}>
              <li
                key={subEcho.id}
                className="ml-8 mt-4 overflow-hidden bg-emerald-800 p-4 text-white hover:bg-emerald-700"
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
