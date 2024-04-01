import Link from "next/link"
import { ClerkProvider } from "@clerk/nextjs"
import "~/styles/globals.css"
import { Button } from "./components/button"

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="absolute right-2 flex gap-4">
            <Link href="/echoTo">
              <Button>⭐️ ECHO ⭐️</Button>
            </Link>
            <Link href="/profile">
              <Button>🧒</Button>
            </Link>
            <Link href="/notifications">
              <Button>🔔</Button>
            </Link>
          </nav>
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#00BFB2] to-[#f0f3bd] bg-fixed text-slate-600">
            <Link href="/">
              <h1 className="my-8 font-mono text-7xl subpixel-antialiased drop-shadow-lg">
                Echo
              </h1>
            </Link>
            <div className="mb-12 h-full w-128">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
