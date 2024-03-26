import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useDeferredValue, useState } from "react"
import UserSearch from "./user-search"
import { Input } from "~/app/components/input"

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
    <>
      <Input
        name="displayName"
        autoFocus
        placeholder="Echo to"
        onChange={handleOnChange}
      />
      <UserSearch
        inputUserName={deferredUserName}
        setIdSelected={setIdSelected}
        idSelected={idSelected}
        defaultName={defaultName}
      />
    </>
  )
}
