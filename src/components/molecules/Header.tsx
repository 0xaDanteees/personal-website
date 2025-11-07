import { ThemeToggle } from "../atoms/ThemeToggle"

export function Header() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg)]/80 border-b border-[var(--text)]/10 dark:border-white/5">
            <nav className="mx-auto max-w-6xl px-5 md:px-8 py-4 flex justify-between items-center">
                <button 
                    onClick={() => scrollToSection('hero')}
                    className="text-lg font-bold text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                >
                    DO
                </button>
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => scrollToSection('contact')} 
                        className="text-sm text-[var(--text)]/70 hover:text-[var(--primary)] transition-colors font-medium hover:underline"
                    >
                        Contact
                    </button>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}