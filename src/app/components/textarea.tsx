import type { TextareaHTMLAttributes, ReactElement } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  placeholder?: string
  required?: boolean
  label?: ReactElement | string
}

export const Textarea = (props: TextareaProps) => {
  const { name, onChange, className, label, required, ...rest } = props

  const styledTextarea = (
    <textarea
      name={name}
      onChange={onChange}
      className={`h-36 rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset ring-primary-light placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
      required={required}
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
