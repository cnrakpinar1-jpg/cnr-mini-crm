import { useState, useEffect, useCallback } from 'react'
import { getQuotes, updateQuoteStatus, deleteQuote } from '../utils/quoteStorage'
import './QuotesDashboard.css'

const STATUSES = ['Draft', 'Sent', 'Won', 'Lost']

const STATUS_META = {
  Draft: { className: 'badge-draft' },
  Sent:  { className: 'badge-sent' },
  Won:   { className: 'badge-won' },
  Lost:  { className: 'badge-lost' },
}

function formatCurrency(value) {
  const num = parseFloat(value) || 0
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num)
}

export default function QuotesDashboard({ onAddQuote }) {
  const [quotes, setQuotes] = useState([])
  const [filter, setFilter] = useState('All')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const reload = useCallback(() => setQuotes(getQuotes()), [])

  useEffect(() => {
    reload()
  }, [reload])

  function handleStatusChange(id, status) {
    setQuotes(updateQuoteStatus(id, status))
  }

  function handleDelete(id) {
    if (deleteConfirm === id) {
      setQuotes(deleteQuote(id))
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(c => c === id ? null : c), 3000)
    }
  }

  const total = quotes.length
  const byStatus = {
    Draft: quotes.filter(q => q.status === 'Draft').length,
    Sent:  quotes.filter(q => q.status === 'Sent').length,
    Won:   quotes.filter(q => q.status === 'Won').length,
    Lost:  quotes.filter(q => q.status === 'Lost').length,
  }

  const totalValue = quotes.reduce((sum, q) => sum + (parseFloat(q.amount) || 0), 0)
  const wonValue   = quotes.filter(q => q.status === 'Won').reduce((sum, q) => sum + (parseFloat(q.amount) || 0), 0)
  const pending    = byStatus.Draft + byStatus.Sent

  const filtered = filter === 'All' ? quotes : quotes.filter(q => q.status === filter)

  return (
    <div className="quotes-dashboard">
      <header className="quotes-header">
        <div>
          <h1>Quote Tracker</h1>
          <p className="quotes-subtitle">
            {total === 0
              ? 'No quotes yet — create your first quote to get started'
              : `${total} quote${total !== 1 ? 's' : ''} tracked`}
          </p>
        </div>
        <div className="quotes-header-right">
          <div className="quotes-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <button className="add-quote-btn" onClick={onAddQuote}>
            <PlusIcon />
            Add Quote
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          label="Total Quotes"
          value={total}
          icon={<DocumentIcon />}
          color="indigo"
        />
        <StatCard
          label="Total Value"
          value={formatCurrency(totalValue)}
          icon={<DollarIcon />}
          color="green"
          trend={wonValue > 0 ? `${formatCurrency(wonValue)} won` : null}
        />
        <StatCard
          label="Won"
          value={byStatus.Won}
          icon={<TrophyIcon />}
          color="blue"
          trend={total > 0 ? `${Math.round((byStatus.Won / total) * 100)}% win rate` : null}
        />
        <StatCard
          label="Pending"
          value={pending}
          icon={<ClockIcon />}
          color="amber"
          trend={pending > 0 ? `${byStatus.Draft} draft · ${byStatus.Sent} sent` : null}
        />
      </div>

      {/* Table */}
      <div className="table-section">
        <div className="table-toolbar">
          <div className="table-title-group">
            <h2 className="table-title">All Quotes</h2>
            {filtered.length > 0 && (
              <span className="lead-count-badge">{filtered.length}</span>
            )}
          </div>
          <div className="filter-tabs">
            {['All', ...STATUSES].map(s => (
              <button
                key={s}
                className={`filter-tab ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s}
                {s !== 'All' && byStatus[s] > 0 && (
                  <span className="filter-count">{byStatus[s]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <div className="table-wrapper">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Expiry</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(quote => (
                  <tr key={quote.id}>
                    <td>
                      <div className="lead-client">
                        <div className="lead-avatar">
                          {quote.clientName.charAt(0).toUpperCase()}
                        </div>
                        <div className="lead-info">
                          <span className="lead-name">{quote.clientName}</span>
                          <span className="lead-email">{quote.clientEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="service-tag">{quote.description}</span>
                    </td>
                    <td>
                      <span className="quote-amount">{formatCurrency(quote.amount)}</span>
                    </td>
                    <td>
                      <div className="status-cell">
                        <span className={`status-badge ${STATUS_META[quote.status].className}`}>
                          <span className="status-dot" />
                          {quote.status}
                        </span>
                        <select
                          className="status-select"
                          value={quote.status}
                          onChange={e => handleStatusChange(quote.id, e.target.value)}
                          aria-label="Change status"
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <span className="lead-date">
                        {quote.expiryDate
                          ? new Date(quote.expiryDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : <span className="no-expiry">—</span>}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`delete-btn ${deleteConfirm === quote.id ? 'confirming' : ''}`}
                        onClick={() => handleDelete(quote.id)}
                        title={deleteConfirm === quote.id ? 'Click again to confirm' : 'Delete quote'}
                      >
                        {deleteConfirm === quote.id ? <ConfirmIcon /> : <TrashIcon />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color, trend }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card-top">
        <div className={`stat-icon stat-icon--${color}`}>{icon}</div>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value">{value}</div>
      {trend && <div className="stat-trend">{trend}</div>}
    </div>
  )
}

function EmptyState({ filter }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><InboxIcon /></div>
      <h3>No quotes found</h3>
      <p>{filter === 'All'
        ? 'Create your first quote using the New Quote form.'
        : `No quotes with status "${filter}" yet.`}
      </p>
    </div>
  )
}

function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

function DocumentIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}

function DollarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}

function TrophyIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 17 8 21"/><polyline points="16 17 16 21"/><line x1="5" y1="21" x2="19" y2="21"/><path d="M7 4h10v8a5 5 0 0 1-10 0V4z"/><path d="M4 4h3"/><path d="M17 4h3"/><path d="M4 8H3a2 2 0 0 0 0 4h1"/><path d="M20 8h1a2 2 0 0 1 0 4h-1"/></svg>
}

function ClockIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}

function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
}

function ConfirmIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}

function InboxIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
}
