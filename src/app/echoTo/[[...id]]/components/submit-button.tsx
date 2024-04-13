"use client"
import { useFormStatus } from "react-dom"
import { type ButtonProps, Button } from "~/app/components/button"

type Props = {
  text: string
  theme?: ButtonProps["theme"]
}

export function SubmitButton(props: Props) {
  const { text, theme = "primary" } = props
  const { pending } = useFormStatus()

  return (
    <Button
      buttonType="submit"
      theme={theme}
      iconName="upload"
      aria-disabled={pending}
    >
      {pending ? "Loading..." : text}
    </Button>
  )
}
