"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="mx-auto mt-4 w-40 bg-teal-400 py-2 text-white hover:bg-teal-600"
      aria-disabled={pending}
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  )
}
