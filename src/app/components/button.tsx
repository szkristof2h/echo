import type { HTMLAttributes } from "react"
import Icon from "./icons"

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
  isDisabled?: boolean
}

const themes = {
  primary: "button-primary",
  secondary: "button-secondary",
  tertiary: "button-tertiary",
  danger: "button-danger",
  success: "button-success",
  rainbow: "button-rainbow",
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    buttonType = "button",
    theme = "primary",
    children,
    iconName,
    onClick,
    isDisabled = false,
    ...rest
  } = props

  const isRainbow = theme === "rainbow" && !isDisabled

  const buttonTheme = isDisabled
    ? "button-disabled"
    : isRainbow
      ? "rainbow-border rounded-lg"
      : themes[theme]

  const rainbowInnerClassName =
    "bg-primary-light hover:bg-primary-dark rounded-md p-2 text-white"

  const isIconDark =
    theme !== "primary" &&
    theme !== "rainbow" &&
    theme !== "danger" &&
    theme !== "success"

  return (
    <button
      type={buttonType}
      onClick={isDisabled ? undefined : onClick}
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
