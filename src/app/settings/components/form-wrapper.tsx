"use client"
import { updateProfile, type ActionResponse } from "~/app/lib/actions"
import { useFormState } from "react-dom"
import type { User } from "@clerk/nextjs/server"
import { SubmitButton } from "~/app/components/submit-button"
import { Input } from "~/app/components/input"
import { Textarea } from "~/app/components/textarea"
import Container from "~/app/components/container"
import FormError from "~/app/components/form-error"
import { useState } from "react"

type Props = Pick<User, "username"> & {
  bio: string
  interests: string[]
  imageUrl: string
}

export default function FormWrapper(props: Props) {
  const { username, bio, interests, imageUrl } = props
  const [state, formAction] = useFormState<
    ActionResponse | undefined,
    FormData
  >(updateProfile, {
    status: "",
    errors: [],
  })
  const [url, setUrl] = useState(imageUrl)

  return (
    <Container title="Edit profile">
      <form action={formAction} className="flex flex-col gap-y-6">
        <Input
          name="username"
          label="Username"
          autoFocus
          defaultValue={username ?? ""}
        />
        <div className="flex justify-between">
          <Input
            className="w-72"
            name="profile-picture"
            label="Profile picture"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0]

              if (file) setUrl(URL.createObjectURL(file))
            }}
          />
          <img
            className="h-36 w-36 rounded-full shadow-xl"
            src={url ?? imageUrl}
            alt="profile picture"
          />
        </div>
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
