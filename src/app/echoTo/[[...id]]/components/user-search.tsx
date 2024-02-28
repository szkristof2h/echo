"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { User } from "~/db/schema/users"

export default function UserSearch(props: {
  inputUserName: string
  idSelected?: number
  setIdSelected: Dispatch<SetStateAction<number | undefined>>
  idDefault?: number
  defaultName?: string
}) {
  const { inputUserName, idSelected, setIdSelected, idDefault, defaultName } =
    props
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
        const data = await res.json()
        const users = data?.users as Pick<User, "id" | "displayName">[]

        if (users) setUsers(users)
      } catch (error) {
        console.error("REQUEST ERRROR")
      }
    }

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
