// src/components/organisms/Hero.tsx
import { Animated } from "../atoms/Animated";
import { Button } from "../atoms/Button";
import { Github, Linkedin, FileDown } from "lucide-react";

export function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center gap-8 px-5 md:px-8">
            <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-[var(--text)]">
                    <Animated text="Daniel Ortega" />
                </h1>
                <p className="text-xl sm:text-2xl text-[var(--primary)] font-light">
                    Full-stack Developer
                </p>
                <p className="max-w-md text-sm text-[var(--secondary)]/60">
                    Building digital experiences with React, Django, Node & Web3
                </p>
            </div>
            <div className="flex gap-3">
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
                <a href="/DanielOrtega_CV.pdf" download>
                    <Button variant="ghost">
                        <FileDown size={18} />
                    </Button>
                </a>
            </div>
        </section>
    )
}