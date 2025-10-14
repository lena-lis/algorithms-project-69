import getInvertedIndex from './get-inverted-index.js'

export default function search(docs, query) {
  const invertedIndex = getInvertedIndex(docs)

  const term = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/)

  const selectedDocsScores = {}

  for (let word of term) {
    const wordData = invertedIndex[word]

    if (!wordData) continue

    for (let doc of wordData.documents) {
      selectedDocsScores[doc.id]
        = (selectedDocsScores[doc.id] || 0) + doc.tfIdf
    }
  }

  const docIndexMap = new Map(docs.map((doc, index) => [doc.id, index]))

  return Object.entries(selectedDocsScores)
    .sort(([docIdA, scoreA], [docIdB, scoreB]) => {
      const scoreDiff = scoreB - scoreA
      return scoreDiff !== 0
        ? scoreDiff
        : docIndexMap.get(docIdA) - docIndexMap.get(docIdB)
    })
    .map(([docId]) => docId)
}
