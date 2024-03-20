import Container from "~/app/components/container"
import Head from "~/app/components/head"
import { getConnections } from "~/data/connections"
import User from "./components/user"
import { auth } from "@clerk/nextjs"
import { getUsers } from "~/data/users"

export default async function Connections() {
  const connections = await getConnections()
  const { userId: idUser } = auth()
  const idUsers = connections?.map((connection) =>
    connection.idUser === idUser ? connection.idConnection : connection.idUser,
  )
  const users = idUsers ? await getUsers(idUsers) : []
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
          {pendingConnections?.map((connection) => {
            const user = users?.find(
              (user) =>
                user.id === connection.idConnection ||
                user.id === connection.idUser,
            )

            return (
              user?.username && (
                <User
                  id={user.id}
                  displayName={user.username}
                  isPending={!!connection.isPending}
                />
              )
            )
          })}
        </ul>
        <h2>Connections</h2>
        <ul>
          {acceptedConnections?.map((connection) => {
            const user = users?.find(
              (user) =>
                user.id === connection.idConnection ||
                user.id === connection.idUser,
            )

            return (
              user?.username && (
                <User
                  id={user.id}
                  displayName={user.username}
                  isPending={!!connection.isPending}
                />
              )
            )
          })}
        </ul>
      </Container>
    </>
  )
}
