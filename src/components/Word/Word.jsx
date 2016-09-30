import React, { PropTypes } from 'react'
import './Word.scss'

const Word = ({ played, letters }) => {
  const word = played.map(i => letters[i].letter).join('')
  return (
    <div className="word">
      {word}
    </div>
  )
}

Word.propTypes = {
  played: PropTypes.array.isRequired,
  letters: PropTypes.array.isRequired,
}

export default Word
