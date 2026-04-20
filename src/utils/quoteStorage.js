const KEY = 'quoteflow_quotes'

export function getQuotes() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveQuotes(quotes) {
  localStorage.setItem(KEY, JSON.stringify(quotes))
}

export function addQuote(quote) {
  const quotes = getQuotes()
  const newQuote = {
    ...quote,
    id: crypto.randomUUID(),
    status: 'Draft',
    createdAt: new Date().toISOString(),
  }
  saveQuotes([newQuote, ...quotes])
  return newQuote
}

export function updateQuoteStatus(id, status) {
  const quotes = getQuotes()
  const updated = quotes.map(q => q.id === id ? { ...q, status } : q)
  saveQuotes(updated)
  return updated
}

export function deleteQuote(id) {
  const quotes = getQuotes().filter(q => q.id !== id)
  saveQuotes(quotes)
  return quotes
}
