import { useState } from 'react'
import IntakeForm from './components/IntakeForm'
import Dashboard from './components/Dashboard'
import './App.css'

const NAV_ITEMS = [
  { id: 'form', label: 'Intake Form', icon: <FormIcon /> },
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
]

export default function App() {
  const [view, setView] = useState('form')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">CN</div>
            <div className="brand-text">
              <span className="brand-name">CNR Solutions</span>
              <span className="brand-sub">Demo</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">Navigation</p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${view === item.id ? 'active' : ''}`}
              onClick={() => setView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-badge">
            <span className="dot-green" />
            System Online
          </div>
        </div>
      </aside>

      <div className="main-wrapper">
        <div className="demo-banner">
          <span className="demo-banner-dot" />
          <span className="demo-banner-label">Portfolio Demo</span>
          <span className="demo-banner-sep">·</span>
          <span className="demo-banner-text">
            Client Intake &amp; Lead Tracking System — CNR Solutions
          </span>
        </div>
        <main className="main-content">
          {view === 'form' ? (
            <IntakeForm onSubmitSuccess={() => setView('dashboard')} />
          ) : (
            <Dashboard />
          )}
        </main>
      </div>
    </div>
  )
}

function FormIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}
