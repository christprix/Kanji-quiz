import React from 'react'

export default function Flashcard({ kanji }) {
  return (
    <div className='card'>
      <div className="front">
        {kanji.character}
      </div>
      <div className="back">
        {kanji.meaning}
      </div>

    </div>
  )
}
