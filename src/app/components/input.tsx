import type { HTMLAttributes, ReactElement } from "react"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
  label?: ReactElement | string
}

export const Input = (props: InputProps) => {
  const { name, className, label, ...rest } = props

  const styledInput = (
    <input
      name={name}
      className={`ring-primary-light rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
      {...rest}
    />
  )

  return label ? (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      {styledInput}
    </div>
  ) : (
    styledInput
  )
}
