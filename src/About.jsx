import catLogo from '/catlogo.svg'
import './App.css'

function About() {
  return (
    <section className="page fade-in">
      <div className="about-section">
        <img className="profile-image" src={catLogo} alt="Cat logo" />
        <div className="about-text">
          <h2>About</h2>
          <p>
            Software Engineering @ UofA
          </p>
          <p>
            Power Engineering 4th Class @ SAIT
          </p>


        </div>
      </div>
      <div className="skills-section">
      </div>
    </section>
  )
}

export default About
