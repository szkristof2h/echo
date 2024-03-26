export default function Container(props: {
  children: React.ReactNode
  className?: string
  title?: React.ReactElement
  theme?: "primary" | "secondary"
}) {
  const { children, title, theme = "primary" } = props

  const themeStylesLight = {
    primary: "bg-primary-light",
    secondary: "bg-secondary-light",
  }

  const themeStylesDark = {
    primary: "bg-primary-dark",
    secondary: "bg-secondary-dark",
  }

  const contentBaseStyle = `${themeStylesLight[theme]} w-128 overflow-hidden p-4`
  const contentClassName = props.className
    ? `${contentBaseStyle} ${props.className}`
    : contentBaseStyle

  const titleStyle = `${themeStylesDark[theme]} text-xl p-4`

  return (
    <div>
      {!!title && <h2 className={titleStyle}>{title}</h2>}
      <div className={contentClassName}>{children}</div>
    </div>
  )
}
