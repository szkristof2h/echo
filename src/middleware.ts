import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/echo/:id",
    "/profile/:id",
    "/echoTo",
    "/echoTo/:id",
    "/login",
  ],
})
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}