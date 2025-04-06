import { useEffect, useState } from "react";
import { Blanks } from "./Blanks";
import { KeyElement } from "./KeyElement";
import { Penalty } from "./Penalty";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import ChallengeWords from "./ChallengeWords";

export function Hangman({ wordsData, updateWordsData }) {

    let matched = false

    const [failRound, setFailRound] = useState(0)

    console.log(failRound)

    const [blanks, setBlanks] = useState([])

    const [keyboard, setKeyboard] = useState(generateKeyArray)

    const gamewon = failRound < 8 && blanks.length > 0 ? blanks.every(blank => blank.display === true) : false

    const gamelost = failRound === 8

    const roundOver = wordsData.every(word=>word.points!==0)

    useEffect(() => {
        console.log("gamewon: ", gamewon)
        console.log("gamelost: ", gamelost)
        console.log("blanks: ", blanks)
        if (blanks.length === 0 || gamewon || gamelost) {
            const newBlanks = SetupNewGame();
            setBlanks(newBlanks);
        }

    }, [wordsData, gamewon, gamelost]);

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

    function generateChallengeDisplay() {
        return (
            <div className="container-challenge-heading">
                <h1>10 challenge words. Difficulty: easy</h1>
                <div className="challenge-container">
                    {wordsData.map(word => <ChallengeWords key={word.id} value={word.value} points={word.points} />)}
                </div>
            </div>
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
    }

    function SetupNewGame() {
        let index = 0;
        let blankarray = []
        while (index < wordsData.length) {
            if (wordsData[index].points === 0) {
                if (gamewon) {
                    setFailRound(0)
                    updateWordsData(wordsData[index].id, 8 - failRound)
                    break
                } else if (gamelost) {
                    setFailRound(0)
                    updateWordsData(wordsData[index].id, -1)
                    break
                } else {
                    setKeyboard(generateKeyArray())
                    blankarray = wordsData[index].value.split("").map(char => ({ value: char, display: false }))
                    break
                }
            }
            index++
        }
        console.log("blankarray: ", blankarray)
        return blankarray
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
            {roundOver && <Confetti
                width={window.innerWidth || 300}
                height={window.innerHeight || 200}
            />}

            {generateChallengeDisplay()}
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