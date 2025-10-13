export default function search(docs, query) {
  const term = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/)

  const selectedDocs = docs.reduce((acc, doc) => {
    if (!doc.text) return acc

    let uniqueWordsDictionary = {}
    let termAmount = 0

    const textArray = doc.text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)

    textArray.forEach((word) => {
      if (term.includes(word)) {
        if (!Object.hasOwn(uniqueWordsDictionary, word)) {
          uniqueWordsDictionary[word] = 1
        }

        termAmount++
      }
    })

    const uniqueWordsAmount = Object.keys(uniqueWordsDictionary).length

    if (uniqueWordsAmount > 0) {
      acc.push({ id: doc.id, uniqueWords: uniqueWordsAmount, entries: termAmount })
    }
    return acc
  }, [])

  return selectedDocs
    .sort((a, b) => {
      if (b.uniqueWords !== a.uniqueWords) {
        return b.uniqueWords - a.uniqueWords
      }

      return b.entries - a.entries
    })
    .map(doc => doc.id)
}
