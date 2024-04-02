"use client"

import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"
import type { User } from "@clerk/nextjs/server"

export default function UserSearch(props: {
  inputUserName: string
  idSelected?: string
  setIdSelected: Dispatch<SetStateAction<string | undefined>>
  defaultName?: string | null
}) {
  const { inputUserName, idSelected, setIdSelected, defaultName } = props
  const [users, setUsers] = useState<Pick<User, "id" | "username">[]>([])
  const selectedUserName =
    !inputUserName && !!defaultName
      ? defaultName
      : users.find(({ id }) => id === idSelected)?.username

  const handleOnClick = (id: string) => setIdSelected(id)
  const handleRemoveSelection = () => setIdSelected(undefined)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const handleOnChange = async () => {
      try {
        const res = await fetch(`/api/userByName/${inputUserName}`, { signal })

        if (res && "json" in res) {
          const data = (await res.json()) as unknown

          if (data && typeof data === "object" && "users" in data) {
            const users = data.users as Pick<User, "id" | "username">[]
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
        <ul className="flex flex-wrap items-center gap-4">
          Results:
          {inputUserName &&
            users.map((user) => (
              <li
                key={user.id}
                className="button-primary w-auto"
                onClick={() => handleOnClick(user.id)}
              >
                {user.username}
              </li>
            ))}
          {(users.length == 0 || !inputUserName) && " No results"}
        </ul>
      )}
      {idSelected && (
        <div>
          Selected:
          <span className="button-primary ml-4 rounded-r-none">
            {selectedUserName}
          </span>
          <span
            onClick={handleRemoveSelection}
            className="button-danger rounded-l-none"
          >
            X
          </span>
        </div>
      )}
    </>
  )
}
