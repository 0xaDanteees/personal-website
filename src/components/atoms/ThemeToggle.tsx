export function ThemeToggle() {
    const theme = document.documentElement.dataset.theme;
    return (
        <button
            onClick={() => {
                const next = (document.documentElement.dataset.theme === 'light') ? 'dark' : 'light';
                document.documentElement.dataset.theme = next;
                try { localStorage.setItem('theme', next) } catch {}
            }}
            aria-label="Toggle theme"
            className="rounded-md px-3 py-2 text-sm bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-[var(--bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]"
            title="Toggle theme"
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    )
}