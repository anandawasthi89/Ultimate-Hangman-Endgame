import { useState } from "react";
import { Blanks } from "./Blanks";
import { KeyElement } from "./KeyElement";
import { Penalty } from "./Penalty";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export function Hangman() {

    let matched = false

    const [failRound, setFailRound] = useState(0)

    const [blanks, setBlanks] = useState([
        { value: 'B', display: false },
        { value: 'L', display: false },
        { value: 'O', display: false },
        { value: 'O', display: false },
        { value: 'D', display: false }])

    const [keyboard, setKeyboard] = useState(generateKeyArray)

    const gamewon = failRound < 8 && blanks.every(blank => blank.display === true)

    const gamelost = failRound === 8

    const penaltyList = [
        { id: 1, value: "html" },
        { id: 2, value: "css" },
        { id: 3, value: "javascript" },
        { id: 4, value: "react" },
        { id: 5, value: "typescript" },
        { id: 6, value: "node.js" },
        { id: 7, value: "java" },
        { id: 8, value: "python" },
        { id: 9, value: "assembly" }
    ]

    const failTaunts = [
        "Oof, not even close!",
        "Swing and a miss!",
        "You sure you're awake?",
        "Nice try… said no one.",
        "Wrong again, word slayer.",
        "That letter? Bold choice. Bad choice.",
        "Even the hangman cringed.",
        "If bad guesses were gold, you would be rich.",
        "I have seen better guesses from a squirrel.",
        "Letter denied. Try crying instead.",
        "That guess was illegal in 7 countries."
    ]

    function generateKeyArray() {
        let index = 64
        return new Array(26).fill('A').map(() => {
            index++
            return { value: String.fromCharCode(index), correct: null }
        }
        )
    }

    function winloseheading() {
        if (gamelost) {
            return <div className="lose-container"><p>You lost!!!</p></div>
        } else if (gamewon) {
            return <div className="win-container"><p>You win!!!</p></div>
        } else if (failRound > 0) {
            return <div className="taunt-container"><p>{failTaunts[failRound - 1]}</p></div>
        } else {
            return <p></p>
        }
    }

    function generatePenaltyList() {
        return penaltyList.map(
            pen => <Penalty
                key={pen.id}
                value={pen.value}
                dead={failRound >= pen.id}
            />
        )
    }


    function generateBlanks() {
        return blanks.map(blank =>
            <Blanks
                key={nanoid()}
                value={blank.value}
                display={blank.display}
            />
        )
    }

    function generateKeyboard() {
        return keyboard.map(letter => <KeyElement
            key={letter.value}
            value={letter.value}
            correct={letter.correct}
            handleKeyPressed={handleKeyPressed} />)
    }

    function increaseFailRound() {
        setFailRound(keyboard.filter(key => key.correct === false).length + 1)
        if (failRound >= 7) {
            setKeyboard(prevKeyboard => prevKeyboard.map(key => key.correct === null ? { ...key, correct: false } : key))
        }
    }

    function handleKeyPressed(value) {
        console.log("pressed")

        matched = false
        setBlanks(prevBlanks => prevBlanks.map(
            prevBlank => {
                if (prevBlank.value === value) {
                    matched = true
                    return { ...prevBlank, display: true }
                } else {
                    return prevBlank
                }
            }
        ))

        setKeyboard(prevKeyboard => prevKeyboard.map(
            currentkey => {
                if (currentkey.value === value) {
                    if (matched) {
                        return { ...currentkey, correct: true }
                    } else {
                        increaseFailRound()
                        return { ...currentkey, correct: false }
                    }
                } else {
                    return currentkey
                }
            }
        )
        )
    }

    return (
        <main>
            {gamewon && <Confetti
                width={window.innerWidth || 300}
                height={window.innerHeight || 200}
            />}
                {winloseheading()}
            <div className="penalty-container">
                {generatePenaltyList()}
            </div>
            <div className="fillblanks">
                {generateBlanks()}
            </div>
            <div className="key-container">
                {generateKeyboard()}
            </div>
        </main>
    )
}