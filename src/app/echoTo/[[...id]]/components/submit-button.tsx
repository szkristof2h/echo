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
      className="mt-4 w-full bg-emerald-800 p-2 text-white hover:bg-emerald-700"
      aria-disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  )
}
