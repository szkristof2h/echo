export default function FormError(props: { errors?: (string | undefined)[] }) {
  const { errors } = props

  return (
    errors && (
      <ul className="mt-4 text-red-500">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    )
  )
}
