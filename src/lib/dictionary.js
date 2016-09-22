import prefixTree from './prefix-tree'

/**
 * Determines if the given string is a valid word or prefix.
 */
const match = (string) => {
  const match = prefixTree.map[string]
  const isWord = match === prefixTree.WORD
  return {
    isPrefix: !!match,
    isWord,
  }
}

export default { match }
