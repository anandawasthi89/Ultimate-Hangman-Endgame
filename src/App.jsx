import './App.css'
import { useState, useRef, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Menu } from './components/Menu'
import { GameThemeProfile } from './components/GameThemeProfile'
import { Hangman } from './components/Hangman'
import { Highscore } from './components/Highscore'
import { Difficulty } from './components/difficulty'
import { nanoid } from 'nanoid'

function App() {

  const music = useRef(null)
  const [page, setPage] = useState("menu")
  const [wordsData, setWordsData] = useState([])
  const [url, setUrl] = useState("")
  const [scoreArray, setScoreArray] = useState(highscore)
  const [username,setUsername] = useState("")

  useEffect(() => {
    console.log("fetch ran")
    if (url !== "") {
      fetch(url)
        .then(res => res.json())
        .then(res => res.map(r => ({ id: nanoid(), value: r.toUpperCase(), points: 0 })))
        .then(res => setWordsData(res))
        .then(res => console.log("wordsdata: ", res))

    }
  }, [url])

  function updateUsername(name){
    setUsername(name)
  }

  useEffect(() => {
    if(scoreArray.length!==0){
      localStorage.setItem('highscoreArray', JSON.stringify(scoreArray));
    }
  },[scoreArray])

  function highscore(){
    const items = JSON.parse(localStorage.getItem('highscoreArray'));
    if (items) {
      return items
    }else{
      return []
    }
  }

  function updateWordsData(id, points) {
    setWordsData(prevWordsData => prevWordsData.map(word => word.id === id ? { ...word, points: points } : word))
  }

  function currentPage() {
    if (page === "menu") {
      return <Menu
        handlePlay={handlePlay}
        handleHighscore={handleHighscore}
      />
    } else if (page === "play") {
      return <Difficulty startGame={startGame} />
    } else if (page === "startgame") {
      if (wordsData.length !== 0) {
        return <Hangman wordsData={wordsData} updateWordsData={updateWordsData} />
      }
    } else if (page === "highscore") {
      return <Highscore scoreArray={scoreArray} />
    }
  }

  function handlePlay() {
    setPage("play")
  }

  function handleHighscore() {
    setPage("highscore")
  }

  function handleBack() {
    const curscore = wordsData.reduce((prevValue, curValue) => prevValue + (curValue.points > -1 ? curValue.points : 0), 0)
    if(curscore!==0){
      if(scoreArray.length<10){
        setScoreArray(prevScoreArray=>[...prevScoreArray,{name:username,score:curscore}].sort((firstitem,seconditem)=>seconditem.score-firstitem.score))
      }else if(!scoreArray.every(score=>score.score>curscore)){
        setScoreArray(prevScoreArray=>[...prevScoreArray,{name:username,score:curscore}].sort((firstitem,seconditem)=>seconditem.score-firstitem.score).pop())
      }

    }

    console.log(wordsData.reduce((prevValue, curValue) => prevValue + (curValue.points > -1 ? curValue.points : 0), 0))
    setPage("menu")
  }

  function startGame(difficulty) {
    if (difficulty === "Easy") {
      setUrl(`https://random-word-api.vercel.app/api?words=10&length=5`)
    } else if (difficulty === "Medium") {
      setUrl(`https://random-word-api.vercel.app/api?words=10&length=7`)
    } else if (difficulty === "Hard") {
      setUrl(`https://random-word-api.vercel.app/api?words=10&length=9`)
    }
    setPage("startgame")
  }

  return (
    <>
      <Navbar username={username} updateUsername={updateUsername} />
      <GameThemeProfile page={page} handleBack={handleBack} />
      {currentPage()}
    </>
  )
}

export default App
