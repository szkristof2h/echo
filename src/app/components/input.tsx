import type {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement,
} from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
  required?: boolean
  label?: ReactElement | string
  type?: HTMLInputTypeAttribute
}

export const Input = (props: InputProps) => {
  const { name, className, label, required, type, ...rest } = props

  const fileInputStyles =
    "file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-white hover:file:bg-primary-dark"

  const styledInput = (
    <input
      name={name}
      className={`rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset ring-primary-light placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      } ${type === "file" ? fileInputStyles : ""}`}
      required={required}
      type={type}
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
