import { ThemeToggle } from "../atoms/ThemeToggle"
import { LanguageToggle } from "../atoms/LanguageToggle"
import { useI18n } from "../../i18n/useI18n"

export function Header() {
    const { t } = useI18n()

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
                    aria-label={t.nav.home}
                >
                    DO
                </button>
                <div className="flex items-center gap-3 md:gap-5">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="type-body text-sm text-[var(--text)]/70 hover:text-[var(--primary)] hover:underline transition-colors font-medium"
                        aria-label={t.nav.contactAria}
                    >
                        {t.nav.contact}
                    </button>
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}
