export default function getInvertedIndex(docs) {
  const invertedIndex = {};

  docs.forEach((doc) => {
    if (!doc.text) return;

    const text = doc.text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);

    const termFrequencies = {};

    text.forEach((word) => termFrequencies[word] = (termFrequencies[word] || 0) + 1);

    for (let word in termFrequencies) {
      if (Object.hasOwn(termFrequencies, word)) {
        if (!invertedIndex[word]) {
          invertedIndex[word] = {
            idf: 0,
            documents: [],
          };
        }

        invertedIndex[word].documents.push({
          id: doc.id,
          termFrequency: termFrequencies[word] / text.length,
          tfIdf: 0,
        });
      }
    }
  });

  for (const word in invertedIndex) {
    if (Object.hasOwn(invertedIndex, word)) {
      const documents = invertedIndex[word].documents;
      const docCount = documents.length;
      invertedIndex[word].idf = Number(
        Math.log2(1 + (docs.length - docCount + 1) / (docCount + 0.5)).toFixed(3),
      );

      documents.forEach((doc) => doc.tfIdf = doc.termFrequency * invertedIndex[word].idf);
    }
  }

  return invertedIndex;
}
