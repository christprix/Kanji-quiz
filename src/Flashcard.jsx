import React, { useState } from 'react'

export default function Flashcard({ kanji }) {
  const [flip, setFlip] = useState(false)

  function handleClick(e) {
    if (e === kanji.character) {
      console.log("Right answer!");
    }
    else {
      console.log('wrong answer!');
    }
  }
  return (
    <>
      <div className={`card`}>
        <div className="front">
          <div>Which Kanji means "{kanji.meaning}"?</div>
        </div>
        <div className="back">
          {kanji.character}
        </div>
      </div>
      <div >{kanji.options.sort(() => Math.random() - 0.5).map(option => {
        return <div className='card'
          onClick={() => handleClick(option)} key={option}>
          {option}
        </div>
      })}</div>
    </>

  )
}
