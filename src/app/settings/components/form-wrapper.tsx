"use client"
import { updateProfile, type ActionResponse } from "~/app/lib/actions"
import { useFormState } from "react-dom"
import type { User } from "@clerk/nextjs/server"
import { SubmitButton } from "~/app/echoTo/[[...id]]/components/submit-button"
import { Input } from "~/app/components/input"
import { Textarea } from "~/app/components/textarea"
import Container from "~/app/components/container"

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
      <ul>
        {state?.errors?.map((error, i) => (
          <li
            className="bg-danger-dark mb-4 rounded-md px-4 py-2 text-white"
            key={i}
          >
            Couldn't update profile: {error}
          </li>
        ))}
      </ul>
      <form action={formAction} className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <Input name="username" autoFocus defaultValue={username ?? ""} />
        </div>
        <div className="flex flex-col gap-2">
          <label>Bio</label>
          <Textarea name="bio" defaultValue={bio} />
        </div>
        <div className="flex flex-col gap-2">
          <label>Interests (seperate with comma)</label>
          <Textarea name="interests" defaultValue={interests} />
        </div>
        <SubmitButton text="Save" />
      </form>
    </Container>
  )
}
