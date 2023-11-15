import React, { useState } from 'react'

export default function Flashcard({ kanji, start }) {
  const [message, setMessage] = useState([])

  const handleClick = event => {
    if (event.currentTarget.innerHTML === kanji.character) {
      event.currentTarget.classList.add("correct")
    }
    else {
      event.currentTarget.classList.add("wrong")
    }
  }

  function NextQuestion() {
    start()
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
      <div className='options' >{kanji.options.sort(() => Math.random() - 0.5).map(option => {
        return <div className='card option'
          onClick={handleClick} key={option}>
          {option}
        </div>
      })}</div>
      <div>{message}</div>
      <button className="btn" onClick={NextQuestion}>Next</button>
    </>

  )
}
