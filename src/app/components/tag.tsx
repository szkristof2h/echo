import Link from "next/link"
import type { HTMLAttributes, ReactElement } from "react"

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement | string
  href?: string
}

export const Tag = (props: TagProps) => {
  const { children, href, ...rest } = props

  const tag = (
    <div
      className={`w-fit rounded-md bg-purple-400 px-1 text-sm text-white shadow-md ${
        href && "hover:bg-purple-500"
      }`}
      {...rest}
    >
      {children}
    </div>
  )

  return href ? <Link href={href}>{tag}</Link> : tag
}
