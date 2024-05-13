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
  isDisabled?: boolean
  isErrored?: boolean
}

export const Input = (props: InputProps) => {
  const {
    name,
    className,
    label,
    required,
    type,
    isDisabled = false,
    isErrored = false,
    ...rest
  } = props

  const baseStyles =
    "rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset ring-primary-light placeholder:text-slate-300 focus:ring-2"
  const fileInputStyles =
    "file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-white hover:file:bg-primary-dark"
  const errorStyles = "ring-2 ring-danger-light"
  const disabledStyles = "cursor-not-allowed bg-secondary-dark"

  const inputStyles = `${baseStyles} ${className ?? ""} ${
    type === "file" ? fileInputStyles : ""
  } ${isErrored ? errorStyles : ""} ${isDisabled ? disabledStyles : ""}`

  const styledInput = (
    <input
      name={name}
      className={inputStyles}
      required={required}
      type={type}
      disabled={isDisabled}
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
