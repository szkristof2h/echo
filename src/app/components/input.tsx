import type { HTMLAttributes, ReactElement } from "react"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
  required?: boolean
  label?: ReactElement | string
}

export const Input = (props: InputProps) => {
  const { name, className, label, required, ...rest } = props

  const styledInput = (
    <input
      name={name}
      className={`rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset ring-primary-light placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
      required={required}
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
