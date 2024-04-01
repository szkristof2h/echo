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
      className={`button ${className ?? ""}`}
      {...rest}
    />
  )
}
