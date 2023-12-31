import { useEffect, useRef, useState } from 'react'
import './App.css'
import Flashcard from "./Flashcard";
import Pic from "./Pic"
import axios from 'axios'
import ninja from './ninjabear.gif'
import student from './student.gif'
import salaryman from './salaryman.gif'
import dragon from './dragon.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faChildren, faDragon, faUserNinja } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [kanji, setKanji] = useState([])
  const [message, setMessage] = useState('')
  const gifs = []
  const score = useRef(0)
  const [chances, setChances] = useState(2)
  const [difficulty, setDifficult] = useState(null)
  const [picture, setPicture] = useState(null)
  const [warning, setWarning] = useState(null)


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
    const difficultSetting = e.currentTarget.id
    e.preventDefault();
    setWarning(null)
    setDifficult(e.currentTarget.value);
    setMessage(e.currentTarget.id);
    if (difficultSetting === 'Japanese 5th Grader') {
      setPicture(student)
    }
    else if (difficultSetting === 'Japanese Salaryman') {
      setPicture(salaryman)
    }
    else if (difficultSetting === 'Ninja') {
      setPicture(ninja)
    }
    else if (difficultSetting === 'Dragon') {
      setPicture(dragon)
    }
  }

  function start(e) {
    if (difficulty !== null) {
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
    else if (difficulty === null) {
      setWarning("Pick a difficulty dummy!")
    }
  }

  return (
    <>
      <form className='header'>
        <h3 className='title'>Are you smarter than a {message}?</h3>
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
        <div>{warning}</div>
        <Pic picture={picture} />
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
