import type { ActionResponse } from "~/app/lib/actions"
import { createEcho } from "~/app/lib/actions"
import { SubmitButton } from "./submit-button"
import { useFormState } from "react-dom"
import { Input } from "~/app/components/input"
import { Textarea } from "~/app/components/textarea"
import FormError from "~/app/components/form-error"
import { Button } from "~/app/components/button"
import { useState } from "react"
import Container from "~/app/components/container"

export default function EchoForm(props: { id?: string; idParent?: number }) {
  const { id, idParent } = props
  const handleSubmit = (prevState: ActionResponse, formData: FormData) =>
    createEcho(formData, id, idParent)
  const [state, formAction] = useFormState(handleSubmit, {
    status: "",
    errors: [],
  })
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [suggestion, setSuggestion] = useState<string>()

  const handleOnClick = async () => {
    try {
      const res = await fetch("/api/suggestion", {
        method: "POST",
        body: JSON.stringify({
          title,
          text,
        }),
      })
      const data = (await res.json()) as unknown

      if (!!data && typeof data === "string") setSuggestion(data)
    } catch (error) {
      console.error("Error", error)
    }
  }

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
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <Textarea
            required
            label="Your post"
            name="text"
            autoFocus
            placeholder="What's on your mind?"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {suggestion && (
          <Container theme="tertiary">
            Our assistant <i>Echo Breaker</i> is still green and learning how to
            help the best. Please be understanding about the mistakes.
          </Container>
        )}
        {suggestion && (
          <Container className="whitespace-pre-line">{suggestion}</Container>
        )}

        <Button
          buttonType="button"
          theme="primary"
          iconName="search"
          onClick={handleOnClick}
        >
          Review with Echo Breaker
        </Button>
        <SubmitButton text="Submit" theme="secondary" />
      </form>
      <FormError errors={state.errors} />
    </>
  )
}
