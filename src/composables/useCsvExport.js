import { toCsv, downloadCsv } from '../utils/csvUtils'

export function useCsvExport() {
  function exportRowsToCsv({ filename, rows }) {
    const csvContent = toCsv(rows)
    downloadCsv(filename, csvContent)
  }

  return {
    exportRowsToCsv,
  }
}
