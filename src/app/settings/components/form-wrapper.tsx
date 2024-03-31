"use client"
import { updateProfile, type ActionResponse } from "~/app/lib/actions"
import { useFormState } from "react-dom"
import type { User } from "@clerk/nextjs/server"
import { SubmitButton } from "~/app/echoTo/[[...id]]/components/submit-button"
import { Input } from "~/app/components/input"
import { Textarea } from "~/app/components/textarea"

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
    <>
      <ul>
        {state?.errors?.map((error, i) => (
          <li className="bg-danger-dark my-4 px-4 py-2 text-white" key={i}>
            Couldn't update profile: {error}
          </li>
        ))}
      </ul>
      <form action={formAction} className="mt-4 flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label className="bg-primary-dark px-4 py-2">Username</label>
          <Input name="username" autoFocus defaultValue={username ?? ""} />
        </div>
        <div className="flex flex-col">
          <label className="bg-primary-dark px-4 py-2">Bio</label>
          <Textarea name="bio" defaultValue={bio} />
        </div>
        <div className="flex flex-col">
          <label className="bg-primary-dark px-4 py-2">
            Interests (seperate with comma)
          </label>
          <Textarea name="interests" defaultValue={interests} />
        </div>
        <SubmitButton text="Save" />
      </form>
    </>
  )
}
