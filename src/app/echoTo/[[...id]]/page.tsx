import Head from "~/app/components/head"
import FormWrapper from "./components/form-wrapper"
import { getUser, isAdmin } from "~/data/users"
import { getDailyEchoCount } from "~/data/echos"

export default async function Submit({
  params,
}: {
  params: { id?: string[] }
}) {
  const { id } = params
  const defaultUser = id?.[0] ? await getUser(id?.[0]) : null
  const echoCount = await getDailyEchoCount()
  const defaultName = defaultUser?.username
  const idDefault = defaultUser?.id
  const isUserAdmin = isAdmin()

  return (
    <>
      <Head title="Break the Echo" />
      <FormWrapper
        echoCount={echoCount}
        isAdmin={isUserAdmin}
        idDefault={idDefault}
        defaultName={defaultName}
      />
    </>
  )
}
