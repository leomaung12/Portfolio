import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import About from './About.jsx'
import Projects from './Projects.jsx'
import Contact from './Contact.jsx'
import githublogo from './images/github.png'
import linkedinlogo from './images/linkedin.png'
import gmaillogo from './images/gmail.svg'

import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const [showName, setShowName] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const fullText = 'Hey there, my name is'
  const typingSpeed = 100
  const deleteSpeed = 50
  const pauseDelay = 3000

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      return
    }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleTyping = () => {
      if (isPaused) return
      if (!isDeleting) {
        if (index < fullText.length) {
          setDisplayText((prev) => prev + fullText.charAt(index))
          setIndex((prev) => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay)
        }
      } else {
        if (index > 0) {
          setDisplayText((prev) => prev.slice(0, -1))
          setIndex((prev) => prev - 1)
        } else {
          setIsDeleting(false)
          setIsPaused(true)
          setTimeout(() => setIsPaused(false), pauseDelay)
        }
      }
    }

    const timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typingSpeed)
    return () => clearTimeout(timeout)
  }, [index, isDeleting, isPaused])

  useEffect(() => {
    if (!isDeleting && index === fullText.length) {
      setShowName(true)
    }
  }, [isDeleting, index])

  return (
    <>
      <header className="top-bar">
        <h3>Leo Thein Maung</h3>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="page fade-in home-section">
                <div className="socials">
                  <a
                    href="https://linkedin.com/in/leotheinmaung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <img
                      src={linkedinlogo}
                      className="social-logo"
                      alt="LinkedIn logo"
                    />
                  </a>
                  <a
                    href="https://github.com/leomaung12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <img
                      src={githublogo}
                      className="social-logo"
                      alt="GitHub logo"
                    />
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=leomaung999@gmail.com&su=Let's%20Connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <img
                      src={gmaillogo}
                      className="social-logo"
                      alt="Gmail logo"
                    />
                  </a>
                </div>
                <h1 className="wave-title">
                  {displayText}
                  {!isDeleting && <span className="cursor">|</span>}
                </h1>
                <div className="name-slot">
                  <h2 className={`name2 ${showName ? 'is-visible' : 'is-hidden'}`}>
                    Leo
                  </h2>
                </div>
              </section>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

export default App
