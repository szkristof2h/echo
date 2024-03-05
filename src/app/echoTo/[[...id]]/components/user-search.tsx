"use client"

import type { Dispatch, SetStateAction } from "react"
import type { User } from "~/db/schema/users"
import { useEffect, useState } from "react"

export default function UserSearch(props: {
  inputUserName: string
  idSelected?: number
  setIdSelected: Dispatch<SetStateAction<number | undefined>>
  defaultName?: string
}) {
  const { inputUserName, idSelected, setIdSelected, defaultName } = props
  const [users, setUsers] = useState<Pick<User, "id" | "displayName">[]>([])
  const selectedUserName =
    !inputUserName && !!defaultName
      ? defaultName
      : users.find(({ id }) => id === idSelected)?.displayName

  const handleOnClick = (id: number) => setIdSelected(id)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const handleOnChange = async () => {
      try {
        const res = await fetch(`/api/userByName/${inputUserName}`, { signal })

        if (res && "json" in res) {
          const data = (await res.json()) as unknown

          if (data && typeof data === "object" && "users" in data) {
            const users = data.users as Pick<User, "id" | "displayName">[]
            if (users) setUsers(users)
          }
        }
      } catch (error) {
        console.error("REQUEST ERRROR")
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!!inputUserName) handleOnChange()

    return () => {
      controller.abort()
    }
  }, [inputUserName])

  return (
    <>
      {!idSelected && (
        <ul>
          {inputUserName &&
            users.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer hover:underline"
                onClick={() => handleOnClick(user.id)}
              >
                {user.displayName}
              </li>
            ))}
        </ul>
      )}
      <div>{selectedUserName}</div>
    </>
  )
}
