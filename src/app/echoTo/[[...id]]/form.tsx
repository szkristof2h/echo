import { ActionResponse, createEcho } from "~/app/lib/actions"
import { SubmitButton } from "./submit-button"
import { useFormState } from "react-dom"

export default async function Submit(props: { id: number }) {
  const { id } = props
  const handleSubmit = (prevState: ActionResponse, formData: FormData) =>
    createEcho(id, formData)
  const [state, formAction] = useFormState(handleSubmit, { status: "" })

  console.log("state")
  console.log(state)

  return state.status === "success" ? (
    <p>Echo posted successfully!</p>
  ) : (
    <form action={formAction} className="flex flex-col gap-y-2">
      <label>Send an echo to...</label>
      <textarea name="text" autoFocus className="outline-none" />
      <SubmitButton />
    </form>
  )
}
