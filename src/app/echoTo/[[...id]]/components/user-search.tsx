"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { User } from "~/db/schema/users"

export default function UserSearch(props: {
  userName: string
  setIdSelected: Dispatch<SetStateAction<number | undefined>>
}) {
  const { userName, setIdSelected } = props
  const [users, setUsers] = useState<Omit<User, "bio">[]>([])

  const handleOnClick = (id: number) => setIdSelected(id)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const handleOnChange = async () => {
      console.log("fetching", userName, " ", Date.now())
      try {
        const res = await fetch(`api/user/${userName}`, { signal })
        const data = await res.json()
        const users = data?.users as Omit<User, "bio">[]

        if (users) setUsers(users)
      } catch (error) {
        console.error("ERRROR")
      }
    }

    handleOnChange()

    return () => {
      controller.abort()
    }
  }, [userName])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => handleOnClick(user.id)}>
          {user.displayName}
        </li>
      ))}
    </ul>
  )
}
