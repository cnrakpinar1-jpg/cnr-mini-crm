import { useState, useEffect, useCallback } from 'react'
import { getLeads, updateLeadStatus, deleteLead } from '../utils/storage'
import './Dashboard.css'

const STATUSES = ['New', 'Contacted', 'Closed']

const STATUS_META = {
  New:       { className: 'badge-new',       dot: true },
  Contacted: { className: 'badge-contacted', dot: true },
  Closed:    { className: 'badge-closed',    dot: true },
}

export default function Dashboard() {
  const [leads, setLeads] = useState([])
  const [filter, setFilter] = useState('All')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const reload = useCallback(() => setLeads(getLeads()), [])

  useEffect(() => {
    reload()
  }, [reload])

  function handleStatusChange(id, status) {
    setLeads(updateLeadStatus(id, status))
  }

  function handleDelete(id) {
    if (deleteConfirm === id) {
      setLeads(deleteLead(id))
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(c => c === id ? null : c), 3000)
    }
  }

  const total = leads.length
  const byStatus = {
    New:       leads.filter(l => l.status === 'New').length,
    Contacted: leads.filter(l => l.status === 'Contacted').length,
    Closed:    leads.filter(l => l.status === 'Closed').length,
  }

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  const conversionRate = total > 0
    ? Math.round((byStatus.Closed / total) * 100)
    : 0

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Lead Dashboard</h1>
          <p className="dashboard-subtitle">
            {total === 0
              ? 'No leads yet — submit the intake form to get started'
              : `${total} lead${total !== 1 ? 's' : ''} tracked`}
          </p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          label="Total Leads"
          value={total}
          icon={<PeopleIcon />}
          color="indigo"
        />
        <StatCard
          label="New"
          value={byStatus.New}
          icon={<StarIcon />}
          color="blue"
          trend={total > 0 ? `${Math.round((byStatus.New / total) * 100)}% of total` : null}
        />
        <StatCard
          label="Contacted"
          value={byStatus.Contacted}
          icon={<MailIcon />}
          color="amber"
          trend={total > 0 ? `${Math.round((byStatus.Contacted / total) * 100)}% of total` : null}
        />
        <StatCard
          label="Closed"
          value={byStatus.Closed}
          icon={<CheckCircleIcon />}
          color="green"
          trend={total > 0 ? `${conversionRate}% conversion` : null}
        />
      </div>

      {/* Table section */}
      <div className="table-section">
        <div className="table-toolbar">
          <div className="table-title-group">
            <h2 className="table-title">All Leads</h2>
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
                  <th>Service</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id}>
                    <td>
                      <div className="lead-client">
                        <div className="lead-avatar">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="lead-info">
                          <span className="lead-name">{lead.name}</span>
                          <span className="lead-email">{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="service-tag">{lead.service}</span>
                    </td>
                    <td>
                      <span className="message-preview" title={lead.message}>
                        {lead.message.length > 60
                          ? lead.message.slice(0, 60) + '…'
                          : lead.message}
                      </span>
                    </td>
                    <td>
                      <span className="lead-date">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td>
                      <div className="status-cell">
                        <span className={`status-badge ${STATUS_META[lead.status].className}`}>
                          <span className="status-dot" />
                          {lead.status}
                        </span>
                        <select
                          className="status-select"
                          value={lead.status}
                          onChange={e => handleStatusChange(lead.id, e.target.value)}
                          aria-label="Change status"
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <button
                        className={`delete-btn ${deleteConfirm === lead.id ? 'confirming' : ''}`}
                        onClick={() => handleDelete(lead.id)}
                        title={deleteConfirm === lead.id ? 'Click again to confirm' : 'Delete lead'}
                      >
                        {deleteConfirm === lead.id ? <ConfirmIcon /> : <TrashIcon />}
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
      <h3>No leads found</h3>
      <p>{filter === 'All'
        ? 'Submit the intake form to capture your first lead.'
        : `No leads with status "${filter}" yet.`}
      </p>
    </div>
  )
}

function PeopleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}

function StarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}

function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}

function CheckCircleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
