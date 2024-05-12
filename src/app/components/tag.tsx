import type { HTMLAttributes, ReactElement } from "react"

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement | string
}

export const Tag = (props: TagProps) => {
  const { children, ...rest } = props
  return (
    <div
      className="w-fit rounded-md bg-purple-400 px-1 text-sm text-white shadow-md"
      {...rest}
    >
      {children}
    </div>
  )
}
