import { ThemeToggle } from "../atoms/ThemeToggle";

export function Header() {
    return (
        <header 
            className="sticky top-0 z-10 backdrop-blur border-b border-white/10 bg-[color-mix(in_oklab, var(--bg), transparent_75%)]"
        >
            <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between">
                <a href="#hero" className="font-semibold text-[var(--text)]">DO</a>
                <nav className="flex items-center gap-4">
                    <a href="#contact" className="text-sm text-[var(--text)] hover:underline">Contact</a>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}