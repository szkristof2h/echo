import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/echo/:id",
    "/profile/:id",
    "/echoTo",
    "/echoTo/:id",
    "/sign-in",
    "/sign-up",
  ],
})
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
