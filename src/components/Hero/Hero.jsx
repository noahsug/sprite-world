import React, { PropTypes } from 'react'
import ActionPoints from '../ActionPoints'
import Letters from '../Letters'
import './Hero.scss'

const MAX_LETTERS = 4

const Hero = ({ letters, played, ap, addLetter, removeLetter }) => {
  const disableLetters = played.length === MAX_LETTERS
  const disablePlayed = played.length === 0

  return (
    <div className="hero">
      <Letters
        letters={played}
        className="played"
        onClick={removeLetter}
        disabled={disablePlayed}
      />
      <Letters
        letters={letters}
        onClick={addLetter}
        disabled={disableLetters}
      />
      <ActionPoints value={ap} />
    </div>
  )
}

Hero.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  played: PropTypes.arrayOf(PropTypes.string).isRequired,
  ap: PropTypes.number.isRequired,
  addLetter: PropTypes.func.isRequired,
  removeLetter: PropTypes.func.isRequired,
}

export default Hero
