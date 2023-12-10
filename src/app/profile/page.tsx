import Head from "next/head"
import Container from "../components/container"

const text =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
const user: User = {
  displayName: "Darth Vader",
  bio: text,
  interests: ["asdasd", "asdas", "dnrfgnwenfji", "erngtyernf"],
  hasConnections: false,
}

type User = {
  displayName: string
  bio: string
  interests: string[]
  hasConnections: boolean
}

export default function Profile() {
  const { displayName, bio, interests, hasConnections } = user
  return (
    <>
      <Head>
        <title>Echo - Profile</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="flex border-b border-slate-600">
          <h2 className="inline-block">{displayName}</h2>
          <span className="ml-auto inline-block">
            {hasConnections ? "your friend" : "add as friend"}
          </span>
        </div>
        <div className="mb-4 border-b border-slate-600 py-4">{bio}</div>I like:{" "}
        {interests.map((interest) => (
          <span key={interest}>{interest}, </span>
        ))}
      </Container>
    </>
  )
}
