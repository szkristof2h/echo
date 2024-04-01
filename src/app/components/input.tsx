import type { HTMLAttributes } from "react"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
}

export const Input = (props: InputProps) => {
  const { name, className, ...rest } = props
  return (
    <input
      name={name}
      className={`ring-primary-light rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
      {...rest}
    />
  )
}
