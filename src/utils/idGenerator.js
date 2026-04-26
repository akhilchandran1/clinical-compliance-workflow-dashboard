const readPrefix = (prefix) => (prefix || 'ID').toUpperCase().replace(/[^A-Z]/g, '')

export function parseSequence(id, prefix) {
  if (!id || typeof id !== 'string') return null
  const safePrefix = readPrefix(prefix)
  const regex = new RegExp(`^${safePrefix}-(\\d{4,})$`)
  const match = id.match(regex)
  if (!match) return null
  const number = Number.parseInt(match[1], 10)
  return Number.isFinite(number) ? number : null
}

export function generateNextId(prefix, records = []) {
  const safePrefix = readPrefix(prefix)
  const list = Array.isArray(records) ? records : []
  const maxSequence = list.reduce((max, record) => {
    const sequence = parseSequence(record?.id, safePrefix)
    return sequence && sequence > max ? sequence : max
  }, 0)

  const nextNumber = maxSequence + 1
  const maxAttempts = list.length + 5000

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = `${safePrefix}-${String(nextNumber + attempt).padStart(4, '0')}`
    const isDuplicate = list.some((record) => record?.id === candidate)
    if (!isDuplicate) return candidate
  }

  return `${safePrefix}-${Date.now()}`
}
