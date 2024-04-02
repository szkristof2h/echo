"use client"
import { useFormStatus } from "react-dom"
import { Button } from "~/app/components/button"

type Props = {
  text: string
}

export function SubmitButton(props: Props) {
  const { text } = props
  const { pending } = useFormStatus()

  return (
    <Button buttonType="submit" iconName="upload" aria-disabled={pending}>
      {pending ? "Loading..." : text}
    </Button>
  )
}
