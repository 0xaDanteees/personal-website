import { ThemeToggle } from "../atoms/ThemeToggle"

export function Header() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        // `fixed`, not `sticky`: the app shell sets `overflow-x: hidden`, and a
        // sticky child of a clipped ancestor silently falls back to static in
        // several browsers — which is why the bar scrolled away with the page.
        <header className="site-header">
            {/* Mirrors the content shell exactly (max-w-6xl + px-5 md:px-8) so the
                monogram lines up with each section's left edge at every width. */}
            <nav className="mx-auto max-w-6xl px-5 md:px-8 h-14 md:h-16 flex justify-between items-center">
                <button
                    onClick={() => scrollToSection('hero')}
                    className="text-base md:text-lg font-bold text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                    aria-label="Go to home section"
                >
                    DO
                </button>
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="type-body text-sm text-[var(--text)]/70 hover:text-[var(--primary)] transition-colors font-medium"
                        aria-label="Go to contact section"
                    >
                        Contact
                    </button>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}
