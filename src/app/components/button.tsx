import type { HTMLAttributes } from "react"
import Icon from "./icons"

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
  iconName?: string
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    buttonType = "button",
    theme = "primary",
    children,
    iconName,
    ...rest
  } = props

  const isRainbow = theme === "rainbow"

  const buttonTheme = isRainbow
    ? "rainbow-border rounded-lg border-2"
    : `button-${theme}`

  const rainbowInnerClassName =
    "bg-primary-light hover:bg-primary-dark rounded-md p-2 text-white"

  const isIconDark = theme !== "primary" && theme !== "rainbow"

  return (
    <button
      type={buttonType}
      className={`${buttonTheme} ${className ?? ""} text-center`}
      {...rest}
    >
      <div
        className={`${isRainbow ? rainbowInnerClassName : ""} ${
          iconName ? "grid grid-cols-icon gap-2" : ""
        }`}
      >
        {iconName && (
          <Icon iconName={iconName} className="" isDark={isIconDark} />
        )}
        {children}
      </div>
    </button>
  )
}
