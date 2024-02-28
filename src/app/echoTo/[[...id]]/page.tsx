import Head from "next/head"
import Container from "~/app/components/container"
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
      <Head>
        <title>Echo - Echo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <FormWrapper idDefault={idDefault} defaultName={defaultName} />
      </Container>
    </>
  )
}
