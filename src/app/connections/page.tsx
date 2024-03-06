import Container from "~/app/components/container"
import Link from "next/link"
import Head from "~/app/components/head"
import { getConnections } from "~/data/connections"
import User from "./components/user"

export default async function Connections() {
  const connections = await getConnections(1)
  const pendingConnections = connections?.filter(
    (connection) => connection?.isPending,
  )
  const acceptedConnections = connections?.filter(
    (connection) => !connection?.isPending,
  )

  return (
    <>
      <Head title="Connections" />
      <Container>
        <h2>Pending connections</h2>
        <ul>
          {pendingConnections?.map(
            (connection) =>
              connection.id &&
              connection.displayName && (
                <User
                  id={connection.id}
                  displayName={connection.displayName}
                  idUser={connection.idUser}
                  isPending={!!connection.isPending}
                />
              ),
          )}
        </ul>
        <h2>Connections</h2>
        <ul>
          {acceptedConnections?.map(
            (connection) =>
              connection.id &&
              connection.displayName && (
                <User
                  id={connection.id}
                  displayName={connection.displayName}
                  idUser={connection.idUser}
                  isPending={false}
                />
              ),
          )}
        </ul>
      </Container>
    </>
  )
}
