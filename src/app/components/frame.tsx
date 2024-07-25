export default function Frame(props: {
  children?: React.ReactNode
  className?: string
  title?: React.ReactElement | string
}) {
  const { children, title } = props

  const containerBaseStyle = `rounded-lg border border-primary-dark/40`

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
