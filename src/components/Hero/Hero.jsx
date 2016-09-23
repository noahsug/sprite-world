import React, { PropTypes } from 'react'
import ActionPoints from '../ActionPoints'
import Letters from '../Letters'
import './Hero.scss'

const MAX_LETTERS = 4

const Hero = ({ letters, played, ap, addLetter, removeLetter }) => {
  const disableLetters = played.length === MAX_LETTERS

  return (
    <div className="hero">
      <Letters
        letters={played}
        className="played"
        onClick={removeLetter}
      />
      <Letters
        letters={letters}
        onClick={addLetter}
        disabled={disableLetters}
      />
      <ActionPoints {...ap} />
    </div>
  )
}

Hero.propTypes = {
  letters: PropTypes.array.isRequired,
  played: PropTypes.array.isRequired,
  ap: PropTypes.object.isRequired,
  addLetter: PropTypes.func.isRequired,
  removeLetter: PropTypes.func.isRequired,
}

export default Hero
