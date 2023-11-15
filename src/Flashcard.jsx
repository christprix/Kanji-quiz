import React, { useEffect, useRef, useState } from 'react'

export default function Flashcard({ kanji, start, score }) {
  useEffect(() => {
    document.querySelector(".progress_fill").style.width = `${score.current * 10}%`
  }, [])
  const handleClick = event => {
    const progress = document.querySelector(".progress_fill")
    if (event.currentTarget.innerHTML === kanji.character) {
      event.currentTarget.classList.add("correct")
      score.current = score.current + 1
      progress.style.width = `${score.current * 10}%`
      console.log(score);
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
      <button className="btn" onClick={NextQuestion}>Next</button>
      <div className="progress">
        <div className="progress_fill"></div>
        <span className="progress_text"></span>
      </div >
    </>

  )
}
