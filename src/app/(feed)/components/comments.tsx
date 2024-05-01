import Link from "next/link"
import { getEchos } from "~/data/echos"
import FormWrapper from "./form-wrapper"
import ProfileLink from "./profile-link"
import { getUsers, isAdmin } from "~/data/users"

export default async function Comments(props: {
  id: number
  idUser: string
  defaultTitle?: string
}) {
  const { id, idUser, defaultTitle } = props

  const subEchos = await getEchos(0, id)
  const commentCount = subEchos.length
  const idSenders = subEchos?.map(({ idSender }) => idSender)
  const users = await getUsers(Array.from(new Set([...idSenders])))
  const isUserAdmin = isAdmin()

  return (
    <>
      <FormWrapper
        idUser={idUser}
        idParent={id}
        defaultTitle={defaultTitle}
        isAdmin={isUserAdmin}
      />
      <div className="text-bold mt-4 text-xl">Comments ({commentCount})</div>
      <ul>
        {subEchos.map((subEcho) => {
          const postedBy = users?.find((user) => user.id === subEcho.idSender)

          return (
            <Link href={`/echo/${subEcho.id}`}>
              <li
                key={subEcho.id}
                className="ml-8 mt-4 overflow-hidden whitespace-pre-line rounded-lg bg-primary-light p-4 text-white shadow-xl hover:bg-primary-dark"
              >
                {postedBy?.username && (
                  <ProfileLink
                    idUser={postedBy.id}
                    imageUrl={postedBy.imageUrl}
                    displayName={postedBy.username}
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
