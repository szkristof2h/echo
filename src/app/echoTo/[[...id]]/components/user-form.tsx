import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useState,
} from "react"
import UserSearch from "./user-search"

export default function UserForm(props: {
  id?: number
  setIdSelected: Dispatch<SetStateAction<number | undefined>>
}) {
  const { setIdSelected } = props
  const [userName, setUserName] = useState("")
  const deferredUserName = useDeferredValue(userName)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  return (
    <>
      <label className="mr-4">Echo to</label>
      <input
        name="displayName"
        autoFocus
        className="px-4 outline-none"
        onChange={handleOnChange}
      />
      <UserSearch userName={deferredUserName} setIdSelected={setIdSelected} />
    </>
  )
}
