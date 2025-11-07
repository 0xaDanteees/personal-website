import { forwardRef } from "react";
import clsx from "clsx";

type Props = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'ghost' | 'accent'
}

// Might change these styles later; want to structure first

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', type = 'button', onMouseUp, ...props }, ref
) {
  const base = clsx(
    'relative inline-flex items-center gap-2 rounded-md pl-5 pr-4 py-2',
    'text-sm font-medium transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]',
    'before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0',
    'before:w-1 before:rounded-l-md before:transition-all'
  );

  const variants = {
    primary: clsx(
      'bg-[var(--primary)] text-[var(--bg)] hover:opacity-90',
      'before:bg-[var(--accent)]'
    ),
    ghost: clsx(
      'bg-transparent text-[var(--text)] border border-white/10 hover:bg-white/5',
      'before:bg-[var(--secondary)] before:opacity-60'
    ),
    accent: clsx(
      'bg-transparent text-[var(--text)] border border-white/10 hover:bg-white/5',
      'before:bg-[var(--accent)] before:opacity-60'
    ),
  } as const;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(base, variants[variant], className)}
      onMouseUp={(e) => {
        e.currentTarget.blur();
        onMouseUp?.(e);
      }}
      {...props}
    />
  );
});