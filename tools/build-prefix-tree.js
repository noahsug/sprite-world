const fs = require('fs')

const tree = {}
fs.readFile('word-list.txt', 'utf8', (err, data) => {
  if (err) throw err

  data.split('\n').forEach(w => {
    const lastChar = w.length - 1
    for (let i = 0; i <= lastChar; i++) {
      if (i === lastChar) {
        tree[w] = 2
      } else {
        const word = w.slice(0, i + 1)
        if (tree[word] != 2) tree[word] = 1
      }
    }
  })

  console.log(JSON.stringify(tree))
})
