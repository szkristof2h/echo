"use client"
import { updateProfile, type ActionResponse } from "~/app/lib/actions"
import { useFormState } from "react-dom"
import type { User } from "@clerk/nextjs/server"
import { SubmitButton } from "~/app/echoTo/[[...id]]/components/submit-button"
import { Input } from "~/app/components/input"
import { Textarea } from "~/app/components/textarea"
import Container from "~/app/components/container"
import FormError from "~/app/components/form-error"

type Props = Pick<User, "username"> & {
  bio: string
  interests: string[]
}

export default function FormWrapper(props: Props) {
  const { username, bio, interests } = props
  const [state, formAction] = useFormState<
    ActionResponse | undefined,
    FormData
  >(updateProfile, {
    status: "",
    errors: [],
  })

  return (
    <Container title="Edit profile">
      <form action={formAction} className="flex flex-col gap-y-6">
        <Input
          name="username"
          label="Username"
          autoFocus
          defaultValue={username ?? ""}
        />
        <Textarea label="Bio" name="bio" defaultValue={bio} />
        <Textarea
          label="Interests (seperate with comma)"
          name="interests"
          defaultValue={interests}
        />
        <SubmitButton text="Save" />
      </form>
      <FormError errors={state?.errors} />
    </Container>
  )
}
