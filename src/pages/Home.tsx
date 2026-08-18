import { Hero } from "../components/organisms/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

/**
 * Sections are imported eagerly rather than lazily.
 *
 * They used to sit behind `lazy()` + Suspense, but the build now prerenders the
 * full page: a Suspense boundary hydrating over already-present markup produces
 * a tree mismatch, and React throws the whole prerendered DOM away and repaints
 * — which costs exactly the HTML the crawlers came for. The sections total
 * ~12kB gzipped, so the split was buying very little to begin with.
 */
export default function Home() {
    return (
        <main className="flex flex-col">
            <Hero />
            <div className="section-spacing">
                <About />
            </div>
            <div className="section-spacing">
                <Experience />
            </div>
            <div className="section-spacing">
                <Skills />
            </div>
            <div className="section-spacing">
                <Projects />
            </div>
            <div className="section-spacing">
                <Contact />
            </div>
        </main>
    )
}