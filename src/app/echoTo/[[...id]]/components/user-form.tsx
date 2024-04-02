import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useDeferredValue, useState } from "react"
import UserSearch from "./user-search"
import { Input } from "~/app/components/input"
import Container from "~/app/components/container"

export default function UserForm(props: {
  defaultName?: string | null
  idSelected?: string
  setIdSelected: Dispatch<SetStateAction<string | undefined>>
}) {
  const { setIdSelected, idSelected, defaultName } = props
  const [inputUserName, setInputUserName] = useState("")
  const deferredUserName = useDeferredValue(inputUserName)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputUserName(e.target.value)

    if (idSelected) setIdSelected(undefined)
  }

  return (
    <div className="border-primary-light bg-primary-light/10 rounded-xl border-2 p-4 shadow-xl">
      <div className="flex flex-col gap-4">
        <Input
          name="displayName"
          autoFocus
          label="Echo to"
          placeholder="Echo to"
          onChange={handleOnChange}
        />

        <UserSearch
          inputUserName={deferredUserName}
          setIdSelected={setIdSelected}
          idSelected={idSelected}
          defaultName={defaultName}
        />
      </div>
    </div>
  )
}
