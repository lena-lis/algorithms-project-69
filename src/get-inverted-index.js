export default function getInvertedIndex(docs) {
  const invertedIndex = {}

  for (let doc of docs) {
    if (!doc.text) continue

    const text = doc.text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)

    const termFrequencies = {}
    for (let word of text) {
      termFrequencies[word] = (termFrequencies[word] || 0) + 1
    }

    for (let word in termFrequencies) {
      if (!invertedIndex[word]) {
        invertedIndex[word] = {
          idf: 0,
          documents: [],
        }
      }

      invertedIndex[word].documents.push({
        id: doc.id,
        termFrequency: termFrequencies[word] / text.length,
        tfIdf: 0,
      })
    }
  }

  for (let word in invertedIndex) {
    const docCount = invertedIndex[word].documents.length
    invertedIndex[word].idf = Number(
      Math.log2(1 + (docs.length - docCount + 1) / (docCount + 0.5)).toFixed(3),
    )

    for (let doc of invertedIndex[word].documents) {
      doc.tfIdf = doc.termFrequency * invertedIndex[word].idf
    }
  }

  return invertedIndex
}
