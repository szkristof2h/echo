import Container from "~/app/components/container"
import Head from "~/app/components/head"
import FormWrapper from "./components/form-wrapper"
import { getUser } from "~/data/users"

export default async function Submit({
  params,
}: {
  params: { id?: string[] }
}) {
  const { id } = params
  const defaultUser = id?.[0] ? await getUser(parseInt(id?.[0], 10)) : null
  const defaultName = defaultUser?.displayName
  const idDefault = defaultUser?.id

  return (
    <>
      <Head title="Echo" />
      <Container>
        <FormWrapper idDefault={idDefault} defaultName={defaultName} />
      </Container>
    </>
  )
}
