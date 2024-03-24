import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useDeferredValue, useState } from "react"
import UserSearch from "./user-search"

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
      <div className="flex">
        <label className="bg-emerald-700 px-3 text-white">Echo to:</label>
        <input
          name="displayName"
          autoFocus
          className="bg-emerald-50 px-4 py-2 text-slate-600 outline-none ring-inset ring-emerald-700 placeholder:text-slate-300 focus:ring-2"
          onChange={handleOnChange}
        />
      </div>
      <UserSearch
        inputUserName={deferredUserName}
        setIdSelected={setIdSelected}
        idSelected={idSelected}
        defaultName={defaultName}
      />
    </>
  )
}
