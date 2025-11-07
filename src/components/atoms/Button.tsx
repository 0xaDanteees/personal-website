import { forwardRef } from "react";
import clsx from "clsx";

type Props = React.ComponentProps<'button'> & { variant?: 'primary' | 'ghost' | 'accent' }

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className, variant = 'primary', ...props }, ref
) {

    const base = 
        'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'
        + 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]'
    
    const variants = {
        primary: 'bg-[var(--primary)] text-[var(--bg)] hover:opacity-90',
        ghost: 'bg-transparent text-[var(--text)] border border-white/10 hover:border-white/5',
        accent: 'bg-[var(--accent)] text-[var(--bg)] hover:opacity-90'
    }

    return (
        <button
            ref={ref}
            {...props}
            className={clsx(base, variants[variant], className)}
        />
    )
})