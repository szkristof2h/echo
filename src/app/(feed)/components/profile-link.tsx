"use client"
import { useRouter } from "next/navigation"

export default function ProfileLink(props: {
  idUser: number
  displayName: string
}) {
  const { idUser, displayName } = props
  const router = useRouter()

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    router.push(`/profile/${idUser}`)
    e.preventDefault()
  }

  return (
    <span className="hover:underline" onClick={handleOnClick}>
      @{displayName}
    </span>
  )
}
