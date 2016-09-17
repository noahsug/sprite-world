export const solve = () => ({
  type: 'SOLVE',
})

export const cancel = () => ({
  type: 'CANCEL',
})

export const update = result => ({
  type: 'UPDATE',
  result,
})

export const finish = () => ({
  type: 'FINISH',
})
