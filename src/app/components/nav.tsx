import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "~/app/components/button"

import { SignUpButton } from "@clerk/nextjs"
export default function Navigation() {
  const { userId: idUser } = auth()

  return (
    <nav className="absolute right-2 top-2 flex flex-col gap-4">
      {!!idUser ? (
        <>
          <Link href="/echoTo">
            <Button iconName="pencil">Echo</Button>
          </Link>
          <Link href="/profile">
            <Button iconName="person">Profile</Button>
          </Link>
          <Link href="/notifications">
            <Button iconName="bell">Notifications</Button>
          </Link>
        </>
      ) : (
        <SignUpButton>
          <Button iconName="person">Login</Button>
        </SignUpButton>
      )}
    </nav>
  )
}
