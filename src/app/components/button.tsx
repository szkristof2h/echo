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
      className={`bg-secondary-dark hover:bg-secondary-light w-full p-2 text-white ${
        className ?? ""
      }`}
      {...rest}
    />
  )
}
