import { expect, test } from '@jest/globals'
import search from '../src/index.js'

test('search by multiple words appearing in multiple documents', () => {
  const doc1 = {
    id: 'doc1',
    text: 'I can\'t shoot straight unless I\'ve had a pint!',
  }
  const doc2 = {
    id: 'doc2',
    text: 'Don\'t shoot shoot shoot that thing at me.',
  }
  const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
  const docs = [doc1, doc2, doc3]

  const result = search(docs, 'shoot at me')
  expect(result).toEqual(['doc2', 'doc1'])
})

test('search by a word appearing in multiple documents', () => {
  const doc1 = {
    id: 'doc1',
    text: 'I can\'t shoot straight unless I\'ve had a pint!',
  }
  const doc2 = {
    id: 'doc2',
    text: 'Don\'t shoot shoot shoot that thing at me.',
  }
  const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
  const docs = [doc1, doc2, doc3]

  const result = search(docs, 'shoot')
  expect(result).toEqual(['doc2', 'doc1'])
})

test('search by a word appearing in single document', () => {
  const doc1 = {
    id: 'doc1',
    text: 'I can\'t shoot straight unless I\'ve had a pint!',
  }
  const doc2 = {
    id: 'doc2',
    text: 'Don\'t poke that thing at me.',
  }
  const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
  const docs = [doc1, doc2, doc3]

  const result = search(docs, 'shoot')
  expect(result).toEqual(['doc1'])
})

test('search by a word that does not appear in any document', () => {
  const doc1 = {
    id: 'doc1',
    text: 'I can\'t shoot straight unless I\'ve had a pint!',
  }
  const doc2 = {
    id: 'doc2',
    text: 'Don\'t poke that thing at me.',
  }
  const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
  const docs = [doc1, doc2, doc3]

  const result = search(docs, 'chicken')
  expect(result).toEqual([])
})

test('empty list of documents', () => {
  const docs = []

  const result = search(docs, 'chicken')
  expect(result).toEqual([])
})

test('documents with missing or empty text field', () => {
  const doc1 = {
    id: 'doc1',
    text: '',
  }
  const doc2 = {
    id: 'doc2',
  }
  const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
  const docs = [doc1, doc2, doc3]

  const result = search(docs, 'shooter')
  expect(result).toEqual(['doc3'])
})

test('case insensitivity', () => {
  const doc1 = {
    id: 'doc1',
    text: 'I can\'t shoot straight unless I\'ve had a pint!',
  }

  const docs = [doc1]

  const result = search(docs, 'SHOOT')
  expect(result).toEqual(['doc1'])
})

test('ignore punctuation', () => {
  const doc1 = {
    id: 'doc1',
    text: 'I can\'t shoot straight unless I\'ve had a pint!',
  }

  const docs = [doc1]

  const result = search(docs, 'pint!')
  expect(result).toEqual(['doc1'])
})
