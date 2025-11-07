import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  size?: number
}

export function IconBadge({ icon: Icon, size = 24 }: Props) {
  return (
    <div className="p-2 rounded-md bg-[var(--primary)]/10">
      <Icon size={size} className="text-[var(--primary)]" />
    </div>
  )
}
