const KEY = 'leadflow_leads'

export function getLeads() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveLeads(leads) {
  localStorage.setItem(KEY, JSON.stringify(leads))
}

export function addLead(lead) {
  const leads = getLeads()
  const newLead = {
    ...lead,
    id: crypto.randomUUID(),
    status: 'New',
    createdAt: new Date().toISOString(),
  }
  saveLeads([newLead, ...leads])
  return newLead
}

export function updateLeadStatus(id, status) {
  const leads = getLeads()
  const updated = leads.map(l => l.id === id ? { ...l, status } : l)
  saveLeads(updated)
  return updated
}

export function deleteLead(id) {
  const leads = getLeads().filter(l => l.id !== id)
  saveLeads(leads)
  return leads
}
