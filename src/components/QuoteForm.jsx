import { useState } from 'react'
import { addQuote } from '../utils/quoteStorage'
import './QuoteForm.css'

const EMPTY = { clientName: '', clientEmail: '', description: '', amount: '', expiryDate: '', notes: '' }

export default function QuoteForm({ onSubmitSuccess }) {
  const [fields, setFields] = useState(EMPTY)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addQuote(fields)
    setFields(EMPTY)
    onSubmitSuccess()
  }

  return (
    <div className="quote-form-page">
      <header className="quote-form-header">
        <div className="quote-form-badge">Quote Tracker</div>
        <h1>New Quote</h1>
        <p className="quote-form-subtitle">Fill in the details to create a new client quote.</p>
      </header>

      <div className="quote-form-card">
        <div className="quote-form-card-header">
          <h2>Quote Details</h2>
          <p>All fields are required unless marked optional.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="quote-form-row">
            <Field label="Client Name">
              <input
                type="text"
                name="clientName"
                value={fields.clientName}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />
            </Field>
            <Field label="Client Email">
              <input
                type="email"
                name="clientEmail"
                value={fields.clientEmail}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
            </Field>
          </div>

          <Field label="Service / Description">
            <input
              type="text"
              name="description"
              value={fields.description}
              onChange={handleChange}
              placeholder="e.g. Web Design, SEO Audit, Brand Identity…"
              required
            />
          </Field>

          <div className="quote-form-row">
            <Field label="Quote Amount ($)">
              <div className="input-prefix-wrap">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  name="amount"
                  value={fields.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="input-with-prefix"
                  required
                />
              </div>
            </Field>
            <Field label="Expiry Date" hint="Optional">
              <input
                type="date"
                name="expiryDate"
                value={fields.expiryDate}
                onChange={handleChange}
              />
            </Field>
          </div>

          <Field label="Notes" hint="Optional — internal notes or scope details">
            <textarea
              name="notes"
              value={fields.notes}
              onChange={handleChange}
              placeholder="Add any relevant notes about this quote…"
              rows={4}
            />
          </Field>

          <button type="submit" className="quote-submit-btn">
            <SendIcon />
            Create Quote
          </button>
        </form>
      </div>

      <p className="quote-form-footer-note">
        Quotes are saved locally in your browser for demo purposes.
      </p>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div className="quote-field">
      <label className="quote-label">
        {label}
        {hint && <span className="quote-label-hint">{hint}</span>}
      </label>
      {children}
    </div>
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
