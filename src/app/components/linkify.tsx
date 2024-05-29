import Link from "next/link"
import OtherLinkify from "linkify-react"
import type { ReactElement } from "react"

type LinkifyProps = {
  children: ReactElement | string
}

export const Linkify = (props: LinkifyProps) => {
  const { children } = props

  const renderLink = ({
    attributes,
    content,
  }: {
    attributes: any
    content: string
  }) => {
    const { href, ...props } = attributes
    return (
      <Link
        href={href}
        target="_blank"
        className="text-blue-700 hover:underline"
        {...props}
      >
        {content}
      </Link>
    )
  }

  return (
    <OtherLinkify options={{ render: renderLink, nl2br: true }}>
      {children}
    </OtherLinkify>
  )
}
