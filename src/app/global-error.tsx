"use client" // Error components must be Client Components

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#00BFB2] to-[#f0f3bd] bg-fixed text-slate-600">
          <div>
            <h2>Something went wrong!</h2>
            <p>{error?.message}</p>
            <button onClick={() => reset()}>Try again</button>
          </div>
        </main>
      </body>
    </html>
  )
}
