import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => 
        (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark'
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('theme', theme) } catch {}
    }, [theme]);

    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md px-3 py-2 text-sm bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-[var(--bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]"
            title="Toggle theme"
        >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}