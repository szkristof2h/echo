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
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#00BFB2] to-[#f0f3bd]">
          <h1 className="mt-8 font-mono text-7xl subpixel-antialiased drop-shadow-lg">
            Echo
          </h1>
          <div className="h-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
