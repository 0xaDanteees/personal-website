import { Animated } from "../atoms/Animated";
import { Button } from "../atoms/Button";
import { LiquidGlass } from "./LiquidGlass";
import { Github, Linkedin, FileDown, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSplashTiming } from "../hooks/useSplashTiming";
import { useHeroScrollSnap } from "../hooks/useHeroScrollSnap";
import { EXTERNAL_LINKS } from "../../config/constants";

/** Matches the chevron's rotation transition in index.css. */
const CHEVRON_ROTATE_MS = 300;
/** Beat between the chevron settling and the page moving. */
const CHEVRON_SETTLE_MS = 400;

export function Hero() {
    const [animKey, setAnimKey] = useState(0);
    // 'down' bobs in place inviting the scroll; 'up' is the rotated state that
    // points back to the hero and stays visible in the other sections.
    const [chevronFacing, setChevronFacing] = useState<'down' | 'up'>('down');
    const [isSnapping, setIsSnapping] = useState(false);
    const snapTimers = useRef<number[]>([]);

    const { showContent, startAnimation } = useSplashTiming();

    // One choreography for both entry points (click and wheel/key/touch):
    // rotate -> let the rotation finish -> beat -> move the page.
    const goToAbout = useCallback(() => {
        setIsSnapping(true);
        setChevronFacing('up');
        snapTimers.current.push(
            window.setTimeout(() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Released once the smooth scroll has had time to land, so the
                // interceptor doesn't re-fire mid-flight.
                snapTimers.current.push(
                    window.setTimeout(() => setIsSnapping(false), 900)
                );
            }, CHEVRON_ROTATE_MS + CHEVRON_SETTLE_MS)
        );
    }, []);

    const handleChevronClick = () => {
        if (isSnapping || chevronFacing === 'up') return;
        goToAbout();
    };

    const handleHeroVisibilityChange = useCallback((isHeroVisible: boolean) => {
        // Coming back to the hero re-arms the indicator; leaving it any other way
        // (anchor jump, keyboard, deep link) still lands on the rotated state.
        setChevronFacing(isHeroVisible ? 'down' : 'up');
    }, []);

    // Only intercept while the hero is actually the section in view and the
    // intro has finished playing.
    useHeroScrollSnap({
        enabled: showContent && chevronFacing === 'down' && !isSnapping,
        onSnapStart: goToAbout,
    });

    useEffect(() => {
        const timers = snapTimers.current;
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center gap-8 px-5 md:px-8 md:pr-[35%] relative overflow-hidden">
            <LiquidGlass onHeroVisibilityChange={handleHeroVisibilityChange} />
            <div className={`space-y-4 relative z-10 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 
                    className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-[var(--text)] cursor-pointer"
                    onMouseEnter={() => startAnimation && setAnimKey(prev => prev + 1)}
                >
                    {startAnimation ? (
                        <Animated key={animKey} text="Daniel Ortega" />
                    ) : (
                        <span className="opacity-0">Daniel Ortega</span>
                    )}
                </h1>
                <p className="text-xl sm:text-2xl text-[var(--primary)] font-light">
                    Full stack Developer, building User-centric experiences.
                </p>
                <p className="max-w-md text-sm text-[var(--secondary)]/60">
                    Fintech · RWA · AI Agents · DeFi · IoT
                </p>
            </div>
            <div className={`flex gap-3 float-animation relative z-10 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
                    <Button variant="ghost" aria-label="GitHub">
                        <Github size={18} aria-hidden="true" />
                    </Button>
                </a>
                <a href={EXTERNAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile">
                    <Button variant="accent" aria-label="LinkedIn">
                        <Linkedin size={18} aria-hidden="true" />
                    </Button>
                </a>
                <a href={EXTERNAL_LINKS.cv} target="_blank" rel="noopener noreferrer" aria-label="Download my CV">
                    <Button variant="ghost" className="fizzy-button" aria-label="Download CV">
                        <FileDown size={18} aria-hidden="true" />
                    </Button>
                </a>
            </div>

            <button
                onClick={handleChevronClick}
                data-chevron={chevronFacing}
                className="group absolute top-3/4 left-1/2 chevron-indicator text-[var(--primary)] hover:text-[var(--accent)]"
                aria-label="Scroll to content"
                tabIndex={showContent && chevronFacing === 'down' ? 0 : -1}
            >
                <ChevronDown
                    size={32}
                    className="chevron-glyph"
                    aria-hidden="true"
                />
            </button>
        </section>
    )
}