import { useEffect, useRef, useState } from 'react'
import './App.css'
import Flashcard from "./Flashcard";
import Message from "./Message"
import axios from 'axios'
import giphy from 'giphy-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faChildren, faDragon, faUserNinja } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [kanji, setKanji] = useState([])
  const [message, setMessage] = useState('')
  const gifs = []
  const score = useRef(0)
  const [chances, setChances] = useState(2)
  const [difficulty, setDifficult] = useState(null)

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

  function handleClick(e) {
    e.preventDefault();
    setDifficult(e.currentTarget.value);
    setMessage(e.currentTarget.id);
    console.log(e.currentTarget.id);
    console.log(message);
  }

  function start(e) {
    if (difficult !== null) {
      console.log(difficult);
      axios.get(`https://kanjiapi.dev/v1/kanji/${difficulty}`)
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
                options: [res.data[getnum()], res.data[getnum()], res.data[getnum()], kanji_data.kanji].sort(() => Math.random() - 0.5)
              }
              ]);
            })
        })
    }
  }

  return (
    <>
      <form className='header'>
        <h3 className='title'>Are you smarter than a <div className='selection'>{message}</div> ?</h3>
        <div className="form-group">
          <div className='difficultSetting' name="" id="difficult">
            {difficult.map((level) => {
              return <button onClick={handleClick} key={level.name} id={level.name} value={level.kanjiLevel}>{level.icon}</button>
            })
            }
          </div>
        </div>
      </form>
      <div className='container'>
        {kanji.map(k => {
          return <Flashcard kanji={k} key={k.id} start={start} score={score} chances={chances} setChances={setChances} />
        })}
        <button className="btn start game" onClick={startOver}>New Game</button>
      </div>
    </>
  )

}

const difficult = [{ name: 'Japanese 5th Grader', icon: <FontAwesomeIcon icon={faChildren} size='xl' />, kanjiLevel: 'grade-2' },
{ name: 'Japanese Salaryman', icon: <FontAwesomeIcon icon={faUserTie} size='xl' />, kanjiLevel: "kyoiku" },
{ name: 'Ninja', icon: <FontAwesomeIcon icon={faUserNinja} size='xl' />, kanjiLevel: 'joyo' },
{ name: 'Dragon', icon: <FontAwesomeIcon icon={faDragon} size='xl' />, kanjiLevel: 'grade-8' }]

export default App
