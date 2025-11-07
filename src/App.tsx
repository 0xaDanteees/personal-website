import './App.css'
import { Header } from "./components/molecules/Header"
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden">
      <Header />
      <div className="mx-auto max-w-6xl relative z-10">
        <Home />
      </div>
      <footer className="py-8 text-center text-xs text-[var(--text)]/40 border-t border-[var(--text)]/5 relative z-10">
        &copy; {new Date().getFullYear()} Daniel Ortega
      </footer>
    </div>
  )
}