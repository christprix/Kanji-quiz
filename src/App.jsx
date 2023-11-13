import { useEffect, useState } from 'react'
import './App.css'
import Flashcard from "./Flashcard";
import axios from 'axios'

function App() {
  const [kanji, setKanji] = useState([])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  useEffect(() => {
    axios.get('https://kanjiapi.dev/v1/kanji/kyoiku')
      .then(res => {
        let num = Math.floor(Math.random() * 80)
        function getnum() {
          return Math.floor(Math.random() * 80)
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
  }, [])

  return (
    <>
      <div className='container'>
        <h1>Become a Kanji King!</h1>
        {kanji.map(k => {
          return <Flashcard kanji={k} key={k.id} />
        })}
      </div>
    </>
  )

}

export default App
