export default function search(docs, query) {
  const term = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()

  const selectedDocs = docs.reduce((acc, doc) => {
    if (!doc.text) return acc

    const termAmount = doc.text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word === term).length

    if (termAmount > 0) {
      acc.push({ id: doc.id, entries: termAmount })
    }
    return acc
  }, [])

  return selectedDocs
    .sort((a, b) => b.entries - a.entries)
    .map(doc => doc.id)
}
