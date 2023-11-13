import { useEffect, useState } from 'react'
import './App.css'
import Flashcard from "./Flashcard";
import Message from "./Message"
import axios from 'axios'

function App() {
  const [kanji, setKanji] = useState([])
  const [message, setMessage] = useState()

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  // useEffect(() => {
  //   axios.get('https://kanjiapi.dev/v1/kanji/kyoiku')
  //     .then(res => {
  //       let num = Math.floor(Math.random() * 80)
  //       function getnum() {
  //         return Math.floor(Math.random() * 80)
  //       }
  //       axios.get(`https://kanjiapi.dev/v1/kanji/${res.data[`${num}`]}`)
  //         .then(response => {
  //           let kanji_data = response.data
  //           setKanji([{
  //             id: kanji_data.unicode,
  //             character: kanji_data.kanji,
  //             meaning: decodeString(kanji_data.meanings['0']),
  //             options: [res.data[getnum()], res.data[getnum()], res.data[getnum()], kanji_data.kanji]
  //           }
  //           ]);
  //         })
  //     })
  // }, [])

  function start(e) {
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
  }

  return (
    <>
      <div className='container'>
        <h1>Are you smarter than a (Japanese) 5th grader?</h1>
        <button className="btn" onClick={start}>Ready?</button>
        {kanji.map(k => {
          return <Flashcard kanji={k} key={k.id} message={setMessage} start={start} />
        })}
        <Message message={message} />
      </div>
    </>
  )

}

export default App
