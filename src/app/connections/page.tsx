import Container from "~/app/components/container"
import Head from "~/app/components/head"
import { getConnections, getFollows } from "~/data/connections"
import User from "./components/user"
import { auth } from "@clerk/nextjs"
import { getUsers } from "~/data/users"

export default async function Connections() {
  const connections = (await getConnections()) ?? []
  const follows = (await getFollows()) ?? []
  const { userId: idUser } = auth()
  const idUsers = [...connections, ...follows]?.map((connection) =>
    connection.idUser === idUser ? connection.idConnection : connection.idUser,
  )
  const users = idUsers ? await getUsers(idUsers) : []
  const pendingConnections = connections?.filter(
    (connection) => connection?.isPending,
  )
  const acceptedConnections = connections?.filter(
    (connection) => !connection?.isPending,
  )
  console.log("follows")
  console.log(follows)

  return (
    <>
      <Head title="Connections" />
      <div className="flex flex-col gap-4">
        <ul className="">
          <Container title="Pending connections">
            {pendingConnections?.map((connection) => {
              const user = users?.find(
                (user) =>
                  user.id === connection.idConnection ||
                  user.id === connection.idUser,
              )

              return (
                user?.username && (
                  <User
                    idConnection={user.id}
                    idLoggedInUser={idUser}
                    idUser={connection.idUser}
                    displayName={user.username}
                    isPending={!!connection.isPending}
                    type="connection"
                  />
                )
              )
            })}
          </Container>
        </ul>

        <ul>
          <Container title="Connections" theme="secondary">
            {acceptedConnections?.map((connection) => {
              const user = users?.find(
                (user) =>
                  user.id === connection.idConnection ||
                  user.id === connection.idUser,
              )

              return (
                user?.username && (
                  <User
                    idConnection={user.id}
                    displayName={user.username}
                    isPending={!!connection.isPending}
                    type="connection"
                  />
                )
              )
            })}
            {!acceptedConnections.length && "No connections :("}
          </Container>
        </ul>
        <ul>
          <Container title="Following" theme="secondary">
            {follows?.map((connection) => {
              const user = users?.find(
                (user) =>
                  user.id === connection.idConnection ||
                  user.id === connection.idUser,
              )

              return (
                user?.username && (
                  <User
                    idConnection={user.id}
                    displayName={user.username}
                    isPending={false}
                    type="follow"
                  />
                )
              )
            })}
          </Container>
        </ul>
      </div>
    </>
  )
}
