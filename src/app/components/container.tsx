export default function Container(props: {
  children?: React.ReactNode
  className?: string
  title?: React.ReactElement | string
  theme?: "primary" | "secondary" | "tertiary"
}) {
  const { children, title, theme = "secondary" } = props

  const themeStyles = {
    primary: "from-primary-light to-primary-dark bg-gradient-to-b text-white",
    secondary: "bg-secondary-light",
    tertiary: "bg-tertiary-light", //"from-tertiary-light to-tertiary-dark bg-gradient-to-b",
  }

  const themeStylesDark = {
    primary: "bg-primary-dark",
    secondary: "bg-secondary-dark text-white",
    tertiary: "bg-tertiary-dark",
  }

  const containerBaseStyle = `${themeStyles[theme]} rounded-lg shadow-xl`

  const containerClassName = props.className
    ? `${containerBaseStyle} ${props.className}`
    : containerBaseStyle

  const titleStyle = `text-xl p-4`

  return (
    <div className={containerClassName}>
      {!!title && <h2 className={titleStyle}>{title}</h2>}
      {!!children && <div className="overflow-hidden p-4">{children}</div>}
    </div>
  )
}
