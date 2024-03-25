import type { ActionResponse } from "~/app/lib/actions"
import { createEcho } from "~/app/lib/actions"
import { SubmitButton } from "./submit-button"
import { useFormState } from "react-dom"

export default function EchoForm(props: { id?: string; idParent?: number }) {
  const { id, idParent } = props
  const handleSubmit = (prevState: ActionResponse, formData: FormData) =>
    createEcho(formData, id, idParent)
  const [state, formAction] = useFormState(handleSubmit, {
    status: "",
    errors: [],
  })

  return state?.status === "success" ? (
    <p>Echo posted successfully!</p>
  ) : (
    <form
      action={formAction}
      className="mt-4 flex flex-col items-center text-white"
    >
      <div className="flex w-full flex-col gap-y-4">
        {!idParent && (
          <input
            name="title"
            autoFocus
            placeholder="Title"
            className="bg-emerald-50 px-4 py-2 text-slate-600 outline-none ring-inset ring-emerald-700 placeholder:text-slate-300 focus:ring-2"
          />
        )}
        <textarea
          name="text"
          autoFocus
          placeholder="What's on your mind?"
          className="bg-emerald-50 p-4 text-slate-600 outline-none ring-inset ring-emerald-700 placeholder:text-slate-300 focus:ring-2"
        />
      </div>
      <SubmitButton text="&#x1F680; SUBMIT" />
    </form>
  )
}
