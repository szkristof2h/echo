"use client"
import { Button } from "~/app/components/button"
import { createFollow, deleteFollow } from "~/app/lib/actions"

export default function FollowButton(props: {
  idConnection: string
  isFollowing: boolean
}) {
  const { idConnection, isFollowing } = props

  const handleOnClick = async (id: string) => {
    if (!isFollowing) await createFollow(id)
    else await deleteFollow(id)
  }

  return (
    <Button className="h-16 px-4" onClick={() => handleOnClick(idConnection)}>
      {isFollowing ? "following" : "follow"}
    </Button>
  )
}
