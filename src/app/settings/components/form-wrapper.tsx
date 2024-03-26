"use client"
import { updateProfile, type ActionResponse } from "~/app/lib/actions"
import { useFormState } from "react-dom"
import { User } from "@clerk/nextjs/server"
import { SubmitButton } from "~/app/echoTo/[[...id]]/components/submit-button"

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
      <form action={formAction} className="mt-4 flex flex-col gap-y-2">
        <label>Username</label>
        <input
          name="username"
          autoFocus
          className="px-4 outline-none"
          defaultValue={username ?? ""}
        />
        <label>Bio</label>
        <textarea name="bio" className="px-4 outline-none" defaultValue={bio} />
        <label>Interests (seperate with comma)</label>
        <textarea
          name="interests"
          className="px-4 outline-none"
          defaultValue={interests}
        />
        <SubmitButton text="Save" />
      </form>
      <ul>
        {state?.errors?.map((error, i) => (
          <li className="my-4 bg-red-400 px-4 py-2 text-white" key={i}>
            Couldn't update profile: {error}
          </li>
        ))}
      </ul>
    </>
  )
}