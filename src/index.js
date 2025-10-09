export default function search(docs, word) {
  const normalizedWord = word.toLowerCase().replace(/[^\w\s]/g, '')
  let result = docs.reduce((acc, doc) => {
    if (!doc.text) return acc
    const normalizedDocText = normalizeText(doc.text)
    if (normalizedDocText.includes(normalizedWord)) {
      acc.push(doc.id)
    }
    return acc
  }, [])

  return result
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
}
