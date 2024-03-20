import Container from "~/app/components/container"
import Head from "~/app/components/head"
import FormWrapper from "./components/form-wrapper"
import { getUser } from "~/data/users"
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

  return (
    <>
      <Head title="Echo" />
      <Container>
        <FormWrapper
          echoCount={echoCount}
          idDefault={idDefault}
          defaultName={defaultName}
        />
      </Container>
    </>
  )
}
