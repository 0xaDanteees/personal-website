import { Animated } from "../atoms/Animated";
import { Button } from "../atoms/Button";
import { LiquidGlass } from "./LiquidGlass";
import { Github, Linkedin, FileDown, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSplashTiming } from "../hooks/useSplashTiming";
import { EXTERNAL_LINKS } from "../../config/constants";

export function Hero() {
    const [animKey, setAnimKey] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const [triggerHide, setTriggerHide] = useState(false);
    
    const { showContent, startAnimation } = useSplashTiming();

    const scrollToAbout = () => {
        setIsRotating(true);
        setTriggerHide(true); // Trigger liquid glass to hide
        setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => setIsRotating(false), 600);
        }, 800); // Wait for liquid glass animation
    };

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center gap-8 px-5 md:px-8 md:pr-[35%] relative overflow-hidden">
            <LiquidGlass onScrollRequest={triggerHide ? () => {} : undefined} />
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
                    Full-stack Developer
                </p>
                <p className="max-w-md text-sm text-[var(--secondary)]/60">
                    Building digital experiences with React, Django, Node & Web3
                </p>
            </div>
            <div className={`flex gap-3 float-animation relative z-10 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost">
                        <Github size={18} />
                    </Button>
                </a>
                <a href={EXTERNAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="accent">
                        <Linkedin size={18} />
                    </Button>
                </a>
                <a href={EXTERNAL_LINKS.cv} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="fizzy-button">
                        <FileDown size={18} />
                    </Button>
                </a>
            </div>

            <button 
                onClick={scrollToAbout}
                className="absolute top-3/4 left-1/2 -translate-x-1/2 scroll-indicator text-[var(--primary)] hover:text-[var(--accent)] transition-all duration-300"
                aria-label="Scroll to content"
            >
                <ChevronDown 
                    size={32} 
                    className={`transition-transform duration-300 ${isRotating ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
        </section>
    )
}