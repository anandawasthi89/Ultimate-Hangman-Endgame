import hangman from '../assets/hangman-logo.png'
export function Navbar({username,updateUsername}){
    return(
        <header className='header'>
            <nav>
                <div className='hangman-title'>
                    <img className='nav-img' src={hangman} alt='Ultimate Hangman Endgame'/>
                    <h1 className='title'>Ultimate Hangman Endgame</h1>
                </div>
                <input className='username' id='username' value={username} onChange={e=>updateUsername(e.target.value)} />
            </nav>
        </header>
    )
}