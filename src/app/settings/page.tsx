import Container from "~/app/components/container"
import Head from "~/app/components/head"
import { getCurrentUser } from "~/data/users"
import FormWrapper from "./components/form-wrapper"

export default async function Settings() {
  const user = await getCurrentUser()
  const username = user?.username ?? ""
  const bio = (user?.publicMetadata?.bio as string | undefined) ?? ""
  const interests =
    (user?.publicMetadata?.interests as string[] | undefined) ?? []

  return (
    <>
      <Head title="Settings" />
      <FormWrapper username={username} bio={bio} interests={interests} />
    </>
  )
}
