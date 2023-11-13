import React, { useState } from 'react'

export default function Flashcard({ kanji, message, start }) {
  const [flip, setFlip] = useState(false)

  const handleClick = event => {
    console.log(event.currentTarget.innerHTML);
    console.log(kanji.character);
    if (event.currentTarget.innerHTML === kanji.character) {
      console.log("Right answer!");
      message("Right Answer")
      start()
    }
    else {
      console.log('wrong answer!');
      message("Wrong Answer")
      event.currentTarget.classList.add("wrong")
      start()
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
      <div className='options' >{kanji.options.sort(() => Math.random() - 0.5).map(option => {
        return <div className='card option'
          onClick={handleClick} key={option}>
          {option}
        </div>
      })}</div>
    </>

  )
}
