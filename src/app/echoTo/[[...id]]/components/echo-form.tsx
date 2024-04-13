import type { ActionResponse } from "~/app/lib/actions"
import { createEcho } from "~/app/lib/actions"
import { SubmitButton } from "./submit-button"
import { useFormState } from "react-dom"
import { Input } from "~/app/components/input"
import { Textarea } from "~/app/components/textarea"
import FormError from "~/app/components/form-error"
import { Button } from "~/app/components/button"

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
    <>
      <form
        action={formAction}
        className="mt-4 flex flex-col items-center gap-4"
      >
        <div className="flex w-full flex-col gap-y-4">
          {!idParent && (
            <Input
              required
              label="Title"
              name="title"
              autoFocus
              placeholder="Title"
            />
          )}
          <Textarea
            required
            label="Your post"
            name="text"
            autoFocus
            placeholder="What's on your mind?"
          />
        </div>
        <Button buttonType="button" theme="primary" iconName="search">
          Review with Echo Breaker
        </Button>
        <SubmitButton text="Review with Echo Breaker" theme="primary" />
        <SubmitButton text="Submit" theme="secondary" />
      </form>
      <FormError errors={state.errors} />
    </>
  )
}
