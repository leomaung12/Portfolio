import { useState, useEffect } from 'react'
import githublogo from './images/github.png'
import linkedinlogo from './images/linkedin.png'
import gmaillogo from './images/gmail.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showName, setShowName] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const fullText = "Hey there, my name is";
  const typingSpeed = 100;
  const deleteSpeed = 50;
  const pauseDelay = 3000;

  useEffect(() => {
    const handleTyping = () => {
      if (isPaused) return;
      if (!isDeleting) {
        if (index < fullText.length) {
          setDisplayText(prev => prev + fullText.charAt(index));
          setIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (index > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), pauseDelay);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting, isPaused]);

  useEffect(() => {
    if (!isDeleting && index === fullText.length) {
      setShowName(true);
    }
  }, [isDeleting, index]);

  return (
    <>
      <div>

        <a href="https://linkedin.com/in/leotheinmaung" target="_blank">
          <img src={linkedinlogo} className="logo react" alt="linkedin logo" />
        </a>
        <a href="https://github.com/leomaung12" target="_blank">
          <img src={githublogo} className="logo react" alt="github logo" />
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=leomaung999@gmail.com" >
          <img src={gmaillogo} className="logo react " alt="gmail logo" />
        </a>
      </div>
      <h1>{displayText}{!isDeleting && <span className="cursor">|</span>}</h1>
      {showName && <h2 className="name">Leo</h2>}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          press {count}
        </button>

      </div>
      <p className="read-the-docs">

      </p>
    </>
  )
}

export default App
