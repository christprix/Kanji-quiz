import React, { useEffect, useRef, useState } from 'react'

export default function Flashcard({ kanji, start, score, points }) {
  useEffect(() => {
    document.querySelector(".progress_fill").style.width = `${score.current * 10}%`
  }, [])
  const handleClick = event => {
    const progress = document.querySelector(".progress_fill")
    if (event.currentTarget.innerHTML === kanji.character) {
      event.currentTarget.disabled = true;
      event.currentTarget.classList.add("correct")
      score.current = score.current + 1
      progress.style.width = `${score.current * 10}%`
      console.log(score);
    }
    else {
      if (score.current > 0) {
        event.currentTarget.disabled = true;
        event.currentTarget.classList.add("wrong")
        score.current = score.current - 1
        progress.style.width = `${score.current * 10}%`
        console.log(score);
      }
      else {
        event.currentTarget.disabled = true;
        event.currentTarget.classList.add("wrong")
        console.log(score);
      }
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
        return <button className='card option'
          onClick={handleClick} key={option}>
          {option}
        </button>
      })}</div>
      <button className="btn" onClick={NextQuestion}>Next</button>
      <div className="progress">
        <div className="progress_fill"></div>
        <span className="progress_text"></span>
      </div >
    </>

  )
}
