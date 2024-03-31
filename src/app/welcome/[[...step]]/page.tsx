import Link from "next/link"
import Container from "~/app/components/container"
import Head from "~/app/components/head"
import { SignUpButton } from "@clerk/nextjs"

const stepsContent = [
  {
    step: 0,
    title: "Welcome to Echo!",
    texts: [
      "Echo is a limited experience focusing on quality over quantity.",
      "Are you looking for something else than memes, doomscrolling, one-word-long comments or shorts?",
    ],
    buttons: [
      {
        text: "Yes",
        link: "/welcome/1",
      },
      {
        text: "No",
        link: "/goodbye",
      },
    ],
  },
  {
    step: 1,
    title: "Nice!",
    texts: [
      "Here at Echo we aim to break out of echo chambers and to challenge our views.",
      "How does that sound?",
    ],
    buttons: [
      {
        text: "Awesome!",
        link: "/welcome/2",
      },
      {
        text: "Thanks, but I like my chambers",
        link: "/goodbye",
      },
    ],
  },
  {
    step: 2,
    title: "Alright, last question!",
    texts: [
      "Echo consciously encourages polarizing topics with a focus on good-faith arguments and understanding.",
      "Are you ready for that?",
    ],
    buttons: [
      {
        text: "I'm in! Sign me up to Echo.",
        link: "/login",
      },
      {
        text: "No, I want something different",
        link: "/goodbye",
      },
    ],
  },
]
export default function Welcome({ params }: { params: { step?: string[] } }) {
  const step = params.step?.[0] ? parseInt(params.step?.[0], 10) : 0
  const content = stepsContent[step] ?? stepsContent[0]!
  const defaultLink = "/0"

  return (
    <>
      <Head title="Welcome" />
      <Container className="flex flex-col gap-4" title={content.title}>
        {/* <h1>{content.title}</h1> */}
        {content.texts.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        <div className="flex justify-around">
          {step !== 2 ? (
            <Link
              href={content.buttons[0]?.link ?? defaultLink}
              className="bg-secondary-dark min-w-10 inline-block cursor-pointer px-4 py-2 text-white hover:underline"
            >
              {content.buttons[0]?.text}
            </Link>
          ) : (
            <SignUpButton>
              <div className="bg-secondary-dark inline-block cursor-pointer px-4 py-2 text-white hover:underline">
                I'm in! Sign me up to Echo.
              </div>
            </SignUpButton>
          )}

          <Link
            href={content.buttons[1]?.link ?? defaultLink}
            className="bg-secondary-dark min-w-10 inline-block cursor-pointer px-4 py-2 text-white hover:underline"
          >
            {content.buttons[1]?.text}
          </Link>
        </div>
      </Container>
      {step !== 2 && (
        <SignUpButton>
          <div className="bg-tertiary-dark hover:bg-tertiary-light mt-4 cursor-pointer rounded px-4 py-2">
            I'm already registered, let's login
          </div>
        </SignUpButton>
      )}
    </>
  )
}
