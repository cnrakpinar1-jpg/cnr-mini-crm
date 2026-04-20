import { useState } from 'react'
import { addLead } from '../utils/storage'
import './IntakeForm.css'

const SERVICES = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'SEO & Digital Marketing',
  'Business Consulting',
  'Other',
]

const EMPTY = { name: '', email: '', service: '', message: '' }

export default function IntakeForm({ onSubmitSuccess }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setStatus('loading')
    await new Promise(r => setTimeout(r, 600))
    addLead(form)
    setStatus('success')
    setForm(EMPTY)
    setTimeout(() => {
      setStatus('idle')
      onSubmitSuccess?.()
    }, 2000)
  }

  if (status === 'success') {
    return (
      <div className="form-page">
        <div className="form-page-inner">
          <div className="success-card">
            <div className="success-icon">
              <CheckIcon />
            </div>
            <h2>Submission received!</h2>
            <p>Thanks for reaching out. We'll review your request and get back to you shortly.</p>
            <p className="success-redirect">Redirecting to dashboard…</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="form-page">
      <div className="form-page-inner">
        <header className="form-header">
          <div className="form-header-badge">New Inquiry</div>
          <h1>Get in Touch</h1>
          <p>Fill out the form below and our team will follow up within 24 hours.</p>
        </header>

        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <Field
                label="Full Name"
                error={errors.name}
                hint="Your first and last name"
              >
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className={errors.name ? 'input-error' : ''}
                  autoComplete="name"
                />
              </Field>

              <Field
                label="Email Address"
                error={errors.email}
                hint="We'll never share your email"
              >
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className={errors.email ? 'input-error' : ''}
                  autoComplete="email"
                />
              </Field>
            </div>

            <Field
              label="Service Needed"
              error={errors.service}
            >
              <div className="select-wrapper">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={errors.service ? 'input-error' : ''}
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </Field>

            <Field
              label="Tell Us About Your Project"
              error={errors.message}
              hint="Brief description of what you need"
            >
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your project goals, timeline, or any specific requirements…"
                rows={5}
                className={errors.message ? 'input-error' : ''}
              />
            </Field>

            <button
              type="submit"
              className="submit-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner" />
                  Submitting…
                </>
              ) : (
                <>
                  <SendIcon />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </div>

        <p className="form-footer-note">
          Your information is stored locally and never shared with third parties.
        </p>
      </div>
    </div>
  )
}

function Field({ label, error, hint, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
      {error ? (
        <span className="field-error"><ErrorIcon />{error}</span>
      ) : hint ? (
        <span className="field-hint">{hint}</span>
      ) : null}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
