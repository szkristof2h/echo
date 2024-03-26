import { HTMLAttributes } from "react"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
}

export const Input = (props: InputProps) => {
  const { name, className, ...rest } = props
  return (
    <input
      name={name}
      className={`bg-emerald-50 px-4 py-2 text-slate-600 outline-none ring-inset ring-emerald-700 placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
      {...rest}
    />
  )
}
