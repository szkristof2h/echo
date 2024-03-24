export default function Container(props: {
  children: React.ReactNode
  className?: string
}) {
  const baseStyle =
    "backdrop-blur-m w-128 overflow-hidden bg-gradient-to-b from-emerald-50 to-emerald-100 p-4 drop-shadow-lg"
  const className = props.className
    ? `${baseStyle} ${props.className}`
    : baseStyle
  return <div className={className}>{props.children}</div>
}
