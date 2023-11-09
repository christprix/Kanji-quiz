import { useState } from 'react'
import './App.css'
import Flashcard from "./Flashcard";
function App() {
  const [kanji, setKanji] = useState(KANJISAMPLE)
  console.log(kanji);
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

const KANJISAMPLE = [
  {
    id: 1,
    character: "お前",
    meaning: "Bitch"
  }
]

export default App
