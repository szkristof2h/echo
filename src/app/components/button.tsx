import type { HTMLAttributes } from "react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset"
  placeholder?: string
  theme?: "primary" | "secondary" | "tertiary" | "danger"
}

export const Button = (props: ButtonProps) => {
  const { className, buttonType = "button", theme = "primary", ...rest } = props

  return (
    <button
      type={buttonType}
      className={`button-${theme} ${className ?? ""}`}
      {...rest}
    />
  )
}
