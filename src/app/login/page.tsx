import Head from "~/app/components/head"
import Container from "~/app/components/container"
import { SignUpButton } from "@clerk/nextjs"

export default async function Login() {
  return (
    <>
      <Head title="Login" />
      <Container>
        <SignUpButton>
          <span className="mt-4 inline-block cursor-pointer rounded bg-slate-400 px-4 py-2 hover:bg-slate-300">
            Sign In or Up
          </span>
        </SignUpButton>
      </Container>
    </>
  )
}
