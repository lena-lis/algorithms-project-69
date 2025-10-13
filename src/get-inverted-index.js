export default function getInvertedIndex(docs) {
  const invertedIndex = {}

  for (let doc of docs) {
    if (!doc.text) continue

    const text = doc.text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)

    const seenWords = new Set()

    for (let word of text) {
      if (seenWords.has(word)) continue

      seenWords.add(word)

      if (!invertedIndex[word]) {
        invertedIndex[word] = []
      }

      invertedIndex[word].push(doc.id)
    }
  }

  return invertedIndex
}
