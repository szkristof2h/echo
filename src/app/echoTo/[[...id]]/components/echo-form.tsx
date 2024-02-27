import { ActionResponse, createEcho } from "~/app/lib/actions"
import { SubmitButton } from "./submit-button"
import { useFormState } from "react-dom"

export default async function EchoForm(props: { id?: number }) {
  const { id } = props
  const handleSubmit = (prevState: ActionResponse, formData: FormData) =>
    createEcho(formData, id)
  const [state, formAction] = useFormState(handleSubmit, {
    status: "",
    errors: [],
  })

  console.log("state")
  console.log(state)

  return state.status === "success" ? (
    <p>Echo posted successfully!</p>
  ) : (
    <form action={formAction} className="flex flex-col gap-y-2">
      <textarea name="text" autoFocus className="outline-none" />
      <SubmitButton text="Submit" />
    </form>
  )
}
