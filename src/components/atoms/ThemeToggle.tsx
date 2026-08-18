import { Moon, Sun } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "../../i18n/useI18n";
import { interpolate } from "../../i18n/interpolate";

type Theme = 'dark' | 'light'

export function ThemeToggle() {
    const { t } = useI18n();
    // The first render must match the prerendered HTML exactly, so it cannot
    // read the theme the inline script already applied — a visitor on light mode
    // would render a sun where the HTML has a moon. The real value is adopted in
    // an effect, after hydration.
    const [theme, setTheme] = useState<Theme>('dark');
    const [hydrated, setHydrated] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Adopt whatever the inline head script resolved, once, after hydration.
    useEffect(() => {
        const applied = (document.documentElement.dataset.theme as Theme) || 'dark';
        setTheme(applied);
        setHydrated(true);
    }, []);

    // Writes only once the real theme has been adopted, so the neutral first
    // render never overwrites the visitor's stored preference.
    useEffect(() => {
        if (!hydrated) return;
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Private browsing and blocked storage both throw here; the theme
            // still applies for this session, it just will not be remembered.
        }
    }, [theme, hydrated]);

    const toggle = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';

        const doc = document as Document & {
            startViewTransition?: (cb: () => void) => { ready: Promise<void> }
        };

        // Without View Transitions (or with reduced motion) this is just a state
        // change — the CSS colour transition below still softens it.
        if (!doc.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setTheme(next);
            return;
        }

        // The new theme is revealed by a circle growing from the toggle itself,
        // so the change reads as originating from the control the user pressed
        // rather than the whole page blinking at once.
        const rect = buttonRef.current?.getBoundingClientRect();
        const originX = rect ? rect.left + rect.width / 2 : window.innerWidth;
        const originY = rect ? rect.top + rect.height / 2 : 0;

        // Radius out to the furthest corner, so the circle always finishes by
        // covering the viewport completely.
        const radius = Math.hypot(
            Math.max(originX, window.innerWidth - originX),
            Math.max(originY, window.innerHeight - originY)
        );

        // Read from the same tokens the rest of the site animates on, so the
        // wipe cannot drift out of step with the CSS when either is retuned.
        const styles = getComputedStyle(document.documentElement);
        const duration = parseFloat(styles.getPropertyValue('--dur-theme')) || 460;
        const easing = styles.getPropertyValue('--ease-out-quint').trim() ||
            'cubic-bezier(0.32, 0.72, 0, 1)';

        const transition = doc.startViewTransition(() => setTheme(next));

        // `ready` rejects if the browser skips the transition — a second toggle
        // mid-flight, a hidden tab, an unsupported pseudo-element. Unhandled,
        // that surfaced as a theme change with no animation at all, because the
        // CSS below disables the default cross-fade in favour of this wipe.
        transition.ready
            .then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${originX}px ${originY}px)`,
                            `circle(${radius}px at ${originX}px ${originY}px)`,
                        ],
                    },
                    {
                        duration,
                        easing,
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
            })
            .catch(() => {
                // The colour transition on the surfaces still carries the change.
            });
    };

    return (
        <button
            ref={buttonRef}
            onClick={toggle}
            aria-label={interpolate(t.nav.toggleTheme, {
                theme: theme === 'dark' ? t.nav.themeLight : t.nav.themeDark,
            })}
            className="theme-toggle rounded-md px-3 py-2 text-sm bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-[var(--bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]"
            title={interpolate(t.nav.toggleTheme, { theme: theme === 'dark' ? t.nav.themeLight : t.nav.themeDark })}
        >
            <span className="theme-toggle__icon" key={theme}>
                {theme === 'dark' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </span>
        </button>
    )
}
