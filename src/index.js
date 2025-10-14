import getInvertedIndex from './get-inverted-index.js';

export default function search(docs, query) {
  const invertedIndex = getInvertedIndex(docs);

  const term = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .split(/\s+/);

  const selectedDocsScores = {};

  term.forEach((word) => {
    const wordData = invertedIndex[word];

    if (!wordData) return;

    wordData.documents.forEach((doc) => {
      selectedDocsScores[doc.id] = (selectedDocsScores[doc.id] || 0) + doc.tfIdf;
    });
  });

  return Object.entries(selectedDocsScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([docId]) => docId);
}
