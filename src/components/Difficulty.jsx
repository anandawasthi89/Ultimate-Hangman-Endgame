export function Difficulty({startGame}){

    return(
        <div className='menu-container'>
            <button onClick={e=>startGame(e.target.value)} className="play" value={'Easy'}>Easy</button>
            <button onClick={e=>startGame(e.target.value)} className="play" value={'Medium'}>Medium</button>
            <button onClick={e=>startGame(e.target.value)} className="play" value={'Hard'}>Hard</button>
        </div>
    )
}
