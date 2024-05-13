import type { TextareaHTMLAttributes, ReactElement } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  placeholder?: string
  required?: boolean
  label?: ReactElement | string
  isDisabled?: boolean
  isErrored?: boolean
}

export const Textarea = (props: TextareaProps) => {
  const {
    name,
    onChange,
    className,
    label,
    required,
    isDisabled = false,
    isErrored = false,
    ...rest
  } = props

  const baseStyles =
    "h-36 rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset ring-primary-light placeholder:text-slate-300 focus:ring-2"

  const errorStyles = "ring-2 ring-danger-light"
  const disabledStyles = "cursor-not-allowed bg-secondary-dark"

  const textareaStyles = `${baseStyles} ${className ?? ""} ${
    isErrored ? errorStyles : ""
  } ${isDisabled ? disabledStyles : ""}`

  const styledTextarea = (
    <textarea
      name={name}
      onChange={onChange}
      className={textareaStyles}
      required={required}
      disabled={isDisabled}
      {...rest}
    />
  )

  return label ? (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      {styledTextarea}
    </div>
  ) : (
    styledTextarea
  )
}
