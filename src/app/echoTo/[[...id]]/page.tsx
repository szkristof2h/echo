"use client"
import Head from "next/head"
import Container from "~/app/components/container"
import Form from "./form"

export default async function Submit({ params }: { params: { id: number } }) {
  const { id } = params

  return (
    <>
      <Head>
        <title>Echo - Echo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Form id={id} />
      </Container>
    </>
  )
}