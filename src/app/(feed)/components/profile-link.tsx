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
    <div
      className="inline-block w-fit pb-1 hover:cursor-pointer hover:underline"
      onClick={handleOnClick}
    >
      <Image
        className={`mr-2 inline-block h-10 w-10 rounded-full shadow-sm`}
        src={imageUrl}
        alt="profile picture"
        width={30}
        height={30}
      />
      <span className="">@{displayName}</span>
    </div>
  )
}
