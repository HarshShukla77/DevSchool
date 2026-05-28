import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './App.css'
import logo from './assets/logo.png'
import photo1 from './assets/1.jpeg'
import photo2 from './assets/2.jpeg'
import photo3 from './assets/3.jpeg'
import photo4 from './assets/4.jpeg'
import photo5 from './assets/5.jpeg'
import photo6 from './assets/6.jpeg'
import photo7 from './assets/7.jpeg'
import photo8 from './assets/8.jpeg'
import photo9 from './assets/9.jpeg'
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Certificate QR', href: '#certificate-tool' },
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

const galleryPhotos = [
  {
    title: 'Warm Welcome',
    image: photo5,
    alt: 'Teachers welcoming visitors at the Dev School entrance',
    featured: true,
  },
  {
    title: 'Morning Activity',
    image: photo7,
    alt: 'Students doing a morning activity in the school courtyard',
  },
  {
    title: 'Young Learners',
    image: photo8,
    alt: 'Students standing together in front of a colorful school wall',
  },
  {
    title: 'Creative Work',
    image: photo9,
    alt: 'Students holding drawings during a school creative activity',
  },
  {
    title: 'Achievement Moment',
    image: photo6,
    alt: 'A student receiving an award certificate and trophy',
  },
  {
    title: 'School Program',
    image: photo4,
    alt: 'Speaker addressing a Dev School program from the podium',
  },
  {
    title: 'Celebration Decor',
    image: photo3,
    alt: 'Mothers Day celebration decoration at school',
  },
  {
    title: 'Program Address',
    image: photo2,
    alt: 'Teacher speaking from a decorated Dev School podium',
  },
  {
    title: 'Leadership Visit',
    image: photo1,
    alt: 'School representative presenting flowers during a leadership visit',
  },
]

type CertificatePayload = {
  studentName: string
  rollNumber: string
  course: string
  secondPhaseCompanyName: string
  internshipRole: string
  internshipDuration: string
  totalHoursOrWeeks: string
  issuedOn: string
}

const initialCertificateData: Omit<CertificatePayload, 'issuedOn'> = {
  studentName: '',
  rollNumber: '',
  course: '',
  secondPhaseCompanyName: '',
  internshipRole: '',
  internshipDuration: '',
  totalHoursOrWeeks: '',
}

function encodePayload(payload: CertificatePayload) {
  const json = JSON.stringify(payload)
  const bytes = encodeURIComponent(json).replace(
    /%([0-9A-F]{2})/g,
    (_match, hex) => String.fromCharCode(Number.parseInt(hex, 16)),
  )
  return btoa(bytes)
}

function decodePayload(serialized: string) {
  try {
    const bytes = atob(serialized)
    const encoded = Array.from(bytes)
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join('')
    return JSON.parse(decodeURIComponent(encoded)) as CertificatePayload
  } catch {
    return null
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function CertificatePage({ data }: { data: CertificatePayload }) {
  return (
    <div className="certificate-page">
      <section className="certificate-sheet">
        <div className="certificate-inner">
          <header className="certificate-header">
            <img src={logo} alt="Dev School logo" />
            <div className="certificate-medal" aria-hidden="true">
              <div className="certificate-medal-core">DS</div>
            </div>
            <p>Dev School Jaipur</p>
            <h1>Certificate of Internship Completion</h1>
            <span className="certificate-subtitle">
              Awarded for successful completion of the second phase industry
              internship
            </span>
          </header>

          <article className="certificate-content">
            <p className="certificate-lead">This certificate is proudly presented to</p>
            <h2>{data.studentName}</h2>
            <p className="certificate-intro">
              Roll Number <strong>{data.rollNumber}</strong> from{' '}
              <strong>{data.course}</strong>, for completing internship training at{' '}
              <strong>{data.secondPhaseCompanyName}</strong> in the role of{' '}
              <strong>{data.internshipRole}</strong> for{' '}
              <strong>{data.internshipDuration}</strong>, with a total engagement
              of <strong>{data.totalHoursOrWeeks}</strong>.
            </p>
          </article>

          <div className="certificate-meta-grid">
            <div>
              <span>Company</span>
              <p>{data.secondPhaseCompanyName}</p>
            </div>
            <div>
              <span>Role</span>
              <p>{data.internshipRole}</p>
            </div>
            <div>
              <span>Duration</span>
              <p>{data.internshipDuration}</p>
            </div>
            <div>
              <span>Total Hours or Weeks</span>
              <p>{data.totalHoursOrWeeks}</p>
            </div>
          </div>

          <div className="certificate-footer-row">
            <div className="signature-block">
              <span>Issued On</span>
              <p>{formatDate(data.issuedOn)}</p>
            </div>
            <div className="signature-block">
              <span>Certificate ID</span>
              <p>
                DS-{data.rollNumber || '000'}-
                {new Date(data.issuedOn).getFullYear() || '2026'}
              </p>
            </div>
            <div className="signature-block">
              <span>Authorized Signature</span>
              <p>Dev School Administration</p>
            </div>
          </div>
        </div>
      </section>
      <div className="certificate-actions">
        <a href={window.location.pathname}>Back to Website</a>
        <button type="button" onClick={() => window.print()}>
          Print Certificate
        </button>
      </div>
    </div>
  )
}

function App() {
  const [certificateForm, setCertificateForm] = useState(initialCertificateData)
  const [generatedCertificateUrl, setGeneratedCertificateUrl] = useState('')
  const certificateFromQuery = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const cert = params.get('cert')
    return cert ? decodePayload(cert) : null
  }, [])

  const qrImageUrl = generatedCertificateUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
        generatedCertificateUrl,
      )}`
    : ''

  function updateField(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setCertificateForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function onGenerateQr(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload: CertificatePayload = {
      ...certificateForm,
      issuedOn: new Date().toISOString(),
    }
    const encoded = encodePayload(payload)
    const certificateUrl = `${window.location.origin}${window.location.pathname}?cert=${encodeURIComponent(encoded)}`
    setGeneratedCertificateUrl(certificateUrl)
  }

  if (certificateFromQuery) {
    return <CertificatePage data={certificateFromQuery} />
  }

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

          <div className="hero-media" aria-label="Dev School leadership visit visual">
            <img src={photo1} alt="School representative presenting flowers during a leadership visit" />
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
              <img
                className="highlight-photo"
                src={photo8}
                alt="Dev School students gathered in the courtyard"
              />
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
            <h2>Moments from Dev School</h2>
          </div>
          <div className="gallery-grid">
            {galleryPhotos.map((photo) => (
              <figure
                className={`gallery-card${photo.featured ? ' gallery-card-featured' : ''}`}
                key={photo.title}
              >
                <img src={photo.image} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section certificate-section" id="certificate-tool">
          <div className="section-heading">
            <p className="eyebrow">Certificate QR Generator</p>
            <h2>Enter internship data and create scan-ready QR</h2>
          </div>
          <div className="certificate-tool-grid">
            <form className="certificate-form" onSubmit={onGenerateQr}>
              <label>
                Student Name
                <input
                  name="studentName"
                  value={certificateForm.studentName}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Roll Number
                <input
                  name="rollNumber"
                  value={certificateForm.rollNumber}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Course
                <input
                  name="course"
                  value={certificateForm.course}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Second Phase Company Name
                <input
                  name="secondPhaseCompanyName"
                  value={certificateForm.secondPhaseCompanyName}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Role in Internship
                <input
                  name="internshipRole"
                  value={certificateForm.internshipRole}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Internship Duration
                <input
                  name="internshipDuration"
                  value={certificateForm.internshipDuration}
                  onChange={updateField}
                  placeholder="Example: 12 weeks"
                  required
                />
              </label>
              <label>
                Total Hours or Weeks
                <input
                  name="totalHoursOrWeeks"
                  value={certificateForm.totalHoursOrWeeks}
                  onChange={updateField}
                  placeholder="Example: 240 hours"
                  required
                />
              </label>
              <button type="submit">Generate QR Code</button>
            </form>

            <aside className="qr-preview-card" aria-live="polite">
              <h3>QR Preview</h3>
              {!generatedCertificateUrl && (
                <p>
                  Fill the form and click generate. The QR will open a live
                  certificate link when scanned.
                </p>
              )}
              {generatedCertificateUrl && (
                <>
                  <img
                    src={qrImageUrl}
                    alt="Generated QR code for certificate link"
                  />
                  <a href={generatedCertificateUrl} target="_blank" rel="noreferrer">
                    Open Generated Certificate
                  </a>
                </>
              )}
            </aside>
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
              <p>
                <a href="tel:+918890333093">8890333093</a>,{' '}
                <a href="tel:+919414060681">9414060681</a>
              </p>
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
