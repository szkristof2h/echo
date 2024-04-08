export default function FormError(props: { errors?: (string | undefined)[] }) {
  const { errors } = props

  return (
    errors &&
    errors.length > 0 && (
      <ul className="mt-4 rounded-md bg-danger-dark px-4 py-2 text-white">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    )
  )
}
