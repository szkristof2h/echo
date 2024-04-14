"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ProfileLink(props: {
  idUser: string
  displayName: string
  imageUrl: string
}) {
  const { idUser, displayName, imageUrl } = props
  const router = useRouter()

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    router.push(`/profile/${idUser}`)
    e.preventDefault()
  }

  return (
    <>
      <Image
        className={`mr-2 inline-block`}
        src={imageUrl}
        alt="profile picture"
        width={20}
        height={20}
      />
      <span
        className="hover:cursor-pointer hover:underline"
        onClick={handleOnClick}
      >
        @{displayName}
      </span>
    </>
  )
}
