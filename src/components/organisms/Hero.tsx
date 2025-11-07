import { Animated } from "../atoms/Animated";
import { Button } from "../atoms/Button";
import { Github, Linkedin, FileDown, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Hero() {
    const [animKey, setAnimKey] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    const scrollToAbout = () => {
        setIsRotating(true);
        setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => setIsRotating(false), 600);
        }, 300);
    };

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center gap-8 px-5 md:px-8 relative">
            <div className="space-y-4">
                <h1 
                    className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-[var(--text)] cursor-pointer"
                    onMouseEnter={() => setAnimKey(prev => prev + 1)}
                >
                    <Animated key={animKey} text="Daniel Ortega" />
                </h1>
                <p className="text-xl sm:text-2xl text-[var(--primary)] font-light">
                    Full-stack Developer
                </p>
                <p className="max-w-md text-sm text-[var(--secondary)]/60">
                    Building digital experiences with React, Django, Node & Web3
                </p>
            </div>
            <div className="flex gap-3 float-animation">
                <a href="https://github.com/0xaDanteees" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost">
                        <Github size={18} />
                    </Button>
                </a>
                <a href="https://www.linkedin.com/in/daniel-r-ortega/" target="_blank" rel="noopener noreferrer">
                    <Button variant="accent">
                        <Linkedin size={18} />
                    </Button>
                </a>
                <a href="/DanielOrtega_CV.pdf" download="danielOrtegaCV.pdf">
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