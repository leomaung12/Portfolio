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
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="page fade-in">
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
                <h1>
                  {displayText}
                  {!isDeleting && <span className="cursor">|</span>}
                </h1>
                {showName && <h2 className="name">Leo</h2>}

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
