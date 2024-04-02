import type { HTMLAttributes, ReactElement } from "react"

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  name: string
  placeholder?: string
  label?: ReactElement | string
}

export const Textarea = (props: TextareaProps) => {
  const { name, onChange, className, label, ...rest } = props

  const styledTextarea = (
    <textarea
      name={name}
      onChange={onChange}
      className={`ring-primary-light h-36 rounded-lg bg-white px-4 py-2 text-slate-600 shadow-lg outline-none ring-inset placeholder:text-slate-300 focus:ring-2 ${
        className ?? ""
      }`}
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
