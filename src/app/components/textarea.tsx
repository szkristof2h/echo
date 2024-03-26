import { HTMLAttributes } from "react"

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  name: string
  placeholder?: string
}

export const Textarea = (props: TextareaProps) => {
  const { name, onChange, className, ...rest } = props
  return (
    <textarea
      name={name}
      className={`h-36 bg-emerald-50 px-4 py-2 text-slate-600 outline-none ring-inset ring-emerald-700 placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
      {...rest}
    />
  )
}
