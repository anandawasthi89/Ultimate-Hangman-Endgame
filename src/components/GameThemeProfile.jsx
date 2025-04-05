export function GameThemeProfile({page,handleBack}){
    const theme = "Hangman"
    return(
        <div className="gamethemecontainer">
            <div className="gametitle">
            <h1>Ultimate {theme} Endgame</h1>
            {page!=="menu" && <button onClick={handleBack} className="back">Back</button>}
            </div>
            <p className="title-desc">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </div>
    )
}