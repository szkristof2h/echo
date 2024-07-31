"use client"
import { Button } from "~/app/components/button"
import { createReaction } from "~/app/lib/actions"

type Props = {
  idEcho?: string
  currentReaction?: "agree" | "disagree"
}

export default function ReactionButtons({ idEcho, currentReaction }: Props) {
  const isDisagreeing = currentReaction === "disagree"
  const isAgreeing = currentReaction === "agree"

  const handleOnAgreeClick = async () => {
    if (isAgreeing) return
    idEcho && (await createReaction(idEcho, "agree"))
  }
  const handleOnDisagreeClick = async () => {
    if (isDisagreeing) return
    idEcho && (await createReaction(idEcho, "disagree"))
  }

  return (
    <div className="mt-3 flex justify-end gap-2">
      <Button
        iconName="dislike"
        className={`w-min`}
        theme={isDisagreeing ? "primary" : "secondary"}
        onClick={handleOnDisagreeClick}
      />
      <Button
        iconName="like"
        className="w-min"
        theme={isAgreeing ? "primary" : "secondary"}
        onClick={handleOnAgreeClick}
      />
    </div>
  )
}
