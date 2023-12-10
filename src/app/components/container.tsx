export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-m w-128 overflow-hidden bg-white/80 p-4 drop-shadow-lg">
      {children}
    </div>
  )
}
