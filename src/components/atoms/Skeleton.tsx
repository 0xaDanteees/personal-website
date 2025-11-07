export function Skeleton() {
  return (
    <div className="px-5 md:px-8 py-20 space-y-12 animate-pulse">
      <div className="h-10 w-48 bg-[var(--text)]/10 rounded-lg" />
      <div className="max-w-2xl space-y-4">
        <div className="h-6 bg-[var(--text)]/10 rounded-lg w-full" />
        <div className="h-6 bg-[var(--text)]/10 rounded-lg w-5/6" />
        <div className="h-6 bg-[var(--text)]/10 rounded-lg w-4/6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-[var(--text)]/10 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
