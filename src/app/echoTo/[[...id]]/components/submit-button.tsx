"use client"
import { useFormStatus } from "react-dom"

type Props = {
  text: string
}

export function SubmitButton(props: Props) {
  const { text } = props
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="mx-auto mt-4 w-40 bg-teal-400 py-2 text-white hover:bg-teal-600"
      aria-disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  )
}
