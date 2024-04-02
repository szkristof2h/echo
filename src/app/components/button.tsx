import type { HTMLAttributes } from "react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset"
  placeholder?: string
  theme?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "success"
    | "rainbow"
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    buttonType = "button",
    theme = "primary",
    children,
    ...rest
  } = props

  const isRainbow = theme === "rainbow"

  const buttonTheme = isRainbow
    ? "rainbow-border rounded-lg border-4"
    : `button-${theme}`

  return (
    <button
      type={buttonType}
      className={`${buttonTheme} ${className ?? ""}`}
      {...rest}
    >
      {isRainbow ? (
        <div className="bg-primary-light hover:bg-primary-dark rounded-md p-2 text-white">
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}
