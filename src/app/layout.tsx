import Link from "next/link"
import { ClerkProvider } from "@clerk/nextjs"
import "~/styles/globals.css"

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
          <nav className="absolute right-2">
            <Link href="/echoTo">
              <button className="mx-auto mr-4 mt-4 w-32 bg-teal-400 py-2 text-white hover:bg-teal-600">
                ⭐️ ECHO ⭐️
              </button>
            </Link>
            <Link href="/profile">
              <button className="mx-auto mr-4 mt-4 bg-teal-400 px-4 py-2 text-white hover:bg-teal-600">
                🧒
              </button>
            </Link>
            <Link href="/settings">
              <button className="mx-auto mt-4 bg-teal-400 px-4 py-2 text-white hover:bg-teal-600">
                ⚙️
              </button>
            </Link>
          </nav>
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#00BFB2] to-[#f0f3bd] bg-fixed text-slate-600">
            <Link href="/">
              <h1 className="my-8 font-mono text-7xl subpixel-antialiased drop-shadow-lg">
                Echo
              </h1>
            </Link>
            <div className="h-full">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
