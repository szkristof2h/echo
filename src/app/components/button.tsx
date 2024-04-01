import type { HTMLAttributes } from "react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset"
  placeholder?: string
}

export const Button = (props: ButtonProps) => {
  const { className, buttonType = "button", ...rest } = props
  return (
    <button
      type={buttonType}
      className={`hover:from-secondary-light hover:to-secondary-dark bg-secondary-light w-full rounded-lg p-2 text-white shadow-xl hover:bg-gradient-to-b ${
        className ?? ""
      }`}
      {...rest}
    />
  )
}
