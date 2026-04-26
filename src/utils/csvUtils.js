function escapeCsvValue(value) {
  const raw = value == null ? '' : String(value)
  const escaped = raw.replace(/"/g, '""')
  return `"${escaped}"`
}

export function toCsv(rows = []) {
  if (!Array.isArray(rows) || rows.length === 0) return ''
  const columns = Object.keys(rows[0])
  const header = columns.map(escapeCsvValue).join(',')
  const lines = rows.map((row) => columns.map((column) => escapeCsvValue(row[column])).join(','))
  return [header, ...lines].join('\n')
}

export function downloadCsv(filename, content) {
  if (!content) {
    throw new Error('No CSV content available')
  }
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
