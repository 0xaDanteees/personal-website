import { forwardRef } from "react";
import clsx from "clsx";

type Props = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'ghost'
  /** Square padding for a lone icon, instead of the pill shape used with a label. */
  icon?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', icon = false, type = 'button', onMouseUp, ...props }, ref
) {
  const base = clsx(
    'relative inline-flex items-center justify-center gap-2 rounded-lg',
    icon ? 'p-3' : 'px-4 py-2',
    'text-sm font-medium',
    'transition-[background-color,border-color,color,transform] duration-200 ease-out',
    'active:scale-[0.97]',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]'
  );

  const variants = {
    primary: 'bg-[var(--primary)] text-[var(--bg)] hover:bg-[var(--secondary)]',
    ghost: clsx(
      'bg-transparent text-[var(--text)]',
      'border border-[var(--text)]/15 hover:border-[var(--primary)]/50',
      'hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'
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
