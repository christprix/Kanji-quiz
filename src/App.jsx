import { useEffect, useRef, useState } from 'react'
import './App.css'
import Flashcard from "./Flashcard";
import Message from "./Message"
import axios from 'axios'
import giphy from 'giphy-api';
function App() {
  const [kanji, setKanji] = useState([])
  const [message, setMessage] = useState('')
  const gifs = []
  const score = useRef(0)
  const [points, setPoints] = useState(0)

  function winMessage(params) {
    setMessage('You won!')
  }
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  function startOver(params) {
    score.current = 0;
    start();
  }

  function start(e) {
    axios.get('https://kanjiapi.dev/v1/kanji/kyoiku')
      .then(res => {
        const multiplier = res.data.length
        let num = Math.floor(Math.random() * multiplier)
        function getnum() {
          return Math.floor(Math.random() * multiplier)
        }
        axios.get(`https://kanjiapi.dev/v1/kanji/${res.data[`${num}`]}`)
          .then(response => {
            let kanji_data = response.data
            setKanji([{
              id: kanji_data.unicode,
              character: kanji_data.kanji,
              meaning: decodeString(kanji_data.meanings['0']),
              options: [res.data[getnum()], res.data[getnum()], res.data[getnum()], kanji_data.kanji]
            }
            ]);
          })
      })
  }

  return (
    <>
      <div className='container'>
        <h3>Are you smarter than a (Japanese) 5th grader?</h3>
        <div>{message}</div>
        <button className="btn" onClick={startOver}>Start Game</button>
        {kanji.map(k => {
          return <Flashcard kanji={k} key={k.id} start={start} score={score} setpoints={setPoints} />
        })}
      </div>
    </>
  )

}

export default App
