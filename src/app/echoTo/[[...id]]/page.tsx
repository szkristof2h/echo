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
  const defaultUser = id?.[0] ? await getUser(parseInt(id?.[0], 10)) : null
  const echoCount = await getDailyEchoCount()
  const defaultName = defaultUser?.displayName
  const idDefault = defaultUser?.id

  console.log("{ echoCount }")
  console.log({ echoCount })
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
