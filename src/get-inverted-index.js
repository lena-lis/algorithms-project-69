export default function getInvertedIndex(docs) {
  const invertedIndex = {};

  docs.forEach((doc) => {
    if (!doc.text) return;

    const text = doc.text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);

    const termFrequencies = {};

    text.forEach((word) => {
      termFrequencies[word] = (termFrequencies[word] || 0) + 1
    });

    Object.keys(termFrequencies).forEach((word) => {
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
    });
  });

  Object.keys(invertedIndex).forEach((word) => {
    const {documents} = invertedIndex[word];
    const docCount = documents.length;
    invertedIndex[word].idf = Number(
      Math.log2(1 + (docs.length - docCount + 1) / (docCount + 0.5)).toFixed(3),
    );

    for (let i = 0; i < documents.length; i++) {
      documents[i].tfIdf = documents[i].termFrequency * invertedIndex[word].idf
    }
  });

  return invertedIndex;
}
