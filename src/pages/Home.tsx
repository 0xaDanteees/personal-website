import { Suspense, lazy, useEffect } from "react";
import { Hero } from "../components/organisms/Hero";
import { Skeleton } from "../components/atoms/Skeleton";

const About = lazy(() => import("../components/sections/About"));
const Experience = lazy(() => import("../components/sections/Experience"));
const Skills = lazy(() => import("../components/sections/Skills"));
const Projects = lazy(() => import("../components/sections/Projects"));
const Contact = lazy(() => import("../components/sections/Contact"));

export default function Home() {
    useEffect(() => {
        const timer = setTimeout(() => {
            import("../components/sections/About");
            import("../components/sections/Experience");
            import("../components/sections/Skills");
            import("../components/sections/Projects");
            import("../components/sections/Contact");
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="flex flex-col">
            <Hero />
            <Suspense fallback={<Skeleton />}>
                <div className="section-transition section-spacing">
                    <About />
                </div>
                <div className="section-transition section-spacing">
                    <Experience />
                </div>
                <div className="section-transition section-spacing">
                    <Skills />
                </div>
                <div className="section-transition section-spacing">
                    <Projects />
                </div>
                <div className="section-transition section-spacing">
                    <Contact />
                </div>
            </Suspense>
        </main>
    )
}