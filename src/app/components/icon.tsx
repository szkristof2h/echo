import type { HTMLAttributes } from "react"

interface IconProps extends HTMLAttributes<HTMLImageElement> {
  iconName: string
  isDark?: boolean
}

export default function Icon(props: IconProps) {
  const { className, iconName, isDark = false, ...rest } = props

  return (
    <img
      className={`h-6 ${isDark ? "invert-[0.25]" : "invert"} ${className}`}
      src={`/icons/${iconName}.svg`}
      alt={iconName}
      {...rest}
    />
  )
}
