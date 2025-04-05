import './App.css'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Menu } from './components/Menu'
import { GameThemeProfile } from './components/GameThemeProfile'
import { Hangman } from './components/Hangman'
import { Highscore } from './components/Highscore'

function App() {

  const [page,setPage] = useState("menu")

  function currentPage(){
    if(page==="menu"){
      return <Menu 
              handlePlay={handlePlay}
              handleHighscore={handleHighscore}
              />
    }else if(page==="play"){
      return <Hangman />
    }else if(page==="highscore"){
      return <Highscore />
    }
  }

  function handlePlay(){
    setPage("play")
  }

  function handleHighscore(){
    setPage("highscore")
  }

  function handleBack(){
    setPage("menu")
  }

  return (
    <>
      <Navbar />
      <GameThemeProfile page={page} handleBack={handleBack} />
      {currentPage()}
    </>
  )
}

export default App
