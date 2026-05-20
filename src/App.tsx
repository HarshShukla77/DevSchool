import campusHero from './assets/campus-hero.png'
import './App.css'
import logo from './assets/logo.png'
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
]

const highlights = [
  'Smart classrooms with activity-led learning',
  'Balanced focus on academics, values, and confidence',
  'Safe, supportive environment for every learner',
  'Creative learning spaces that encourage curiosity and innovation.',
  ' Strong foundation in communication and critical thinking skills',
  'Encouragement for leadership, teamwork, and independent thinking',
  ' Inclusive community where every child feels valued and respected'
]

const gallerySlots = [
  'Campus Life',
  'Classroom Activities',
  'Events & Celebrations',
  'Sports & Wellness',
  'Art & Creativity',
  'Achievements',
]

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Dev School home">
          <img src={logo} alt="Dev School logo"  />
          <span>
            <strong>Dev School</strong>
            <small>Learning with purpose</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Admissions information coming soon</p>
            <h1>Dev School</h1>
            <p className="hero-text">
              A modern, caring school built around strong fundamentals,
              confident communication, creative thinking, and everyday
              discipline.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#contact">
                Contact School
              </a>
              <a className="secondary-action" href="#registration">
                Registration Space
              </a>
            </div>
          </div>

          <div className="hero-media" aria-label="Modern school campus visual">
            <img src={campusHero} alt="Modern school campus exterior" />
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">About Us</p>
            <h2>A school designed for steady growth</h2>
          </div>
          <div className="about-grid">
            <p>
Dev School is imagined as a warm, future-focused learning community where every student is encouraged to grow with confidence, curiosity, and purpose. More than just a place for academics, the school is built around the idea that true education develops knowledge, discipline, creativity, communication, and character together.

At Dev School, learning is practical, structured, and joyful. Students are guided through meaningful experiences that help them understand concepts deeply instead of simply memorizing information. Classrooms are designed to inspire participation, collaboration, and independent thinking, allowing children to feel supported while still having the freedom to explore their interests and talents.

The school promotes balanced development through academics, technology, arts, sports, leadership activities, and real-world problem solving. Teachers act as mentors who nurture confidence, encourage curiosity, and create an environment where every child feels seen, respected, and motivated to improve every day.

            </p>
            <div className="highlight-panel">
              {highlights.map((highlight) => (
                <div className="highlight-item" key={highlight}>
                  <span aria-hidden="true"></span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section vision-section" id="vision">
          <div className="section-heading">
            <p className="eyebrow">Vision & Mission</p>
            <h2>Clear values, practical learning</h2>
          </div>
          <div className="mission-grid">
            <article>
              <span>01</span>
              <h3>Vision</h3>
              <p>
                To nurture responsible, capable, and compassionate learners who
                are prepared for higher education, life skills, and the changing
                world around them.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Mission</h3>
              <p>
                To provide strong academics, disciplined routines, creative
                exposure, and personal attention through a safe and progressive
                school environment.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Approach</h3>
              <p>
                To combine classroom learning with projects, activities,
                communication practice, sports, and values that shape confident
                students.
              </p>
            </article>
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2>Space reserved for school photos</h2>
          </div>
          <div className="gallery-grid">
            {gallerySlots.map((slot) => (
              <div className="gallery-slot" key={slot}>
                <span>+</span>
                <p>{slot}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section registration-section" id="registration">
          <div className="registration-card">
            <div>
              <p className="eyebrow">Future Registration Form</p>
              <h2>Admission registration area</h2>
              <p>
                This space is reserved for the school registration form. Later
                you can add student name, parent details, class selection,
                phone number, and document upload fields here.
              </p>
            </div>
            <button type="button" disabled>
              Form coming soon
            </button>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact Us</p>
            <h2>Visit or reach out</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <span>Address</span>
              <p>G1/336 B Sitapura Industrial Area, Jaipur</p>
            </div>
            <div className="contact-card">
              <span>Phone</span>
              <p>+91 00000 00000</p>
            </div>
            <div className="contact-card">
              <span>Email</span>
              <p>info@devschool.example</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Copyright © 2026 Dev School</p>
        <span>Jaipur, Rajasthan</span>
      </footer>
    </div>
  )
}

export default App
