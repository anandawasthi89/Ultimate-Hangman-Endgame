import volumeon from '../assets/volumeon.png'
import volumeoff from '../assets/volumeoff.png'
import {useState} from 'react'
export function Menu({handlePlay,handleHighscore}){
    const [volumeToggle,setVolumeToggle] = useState(true)

    function handleVolumeToggle(){
        setVolumeToggle(prevVolumeToggle=>!prevVolumeToggle)
    }

    return(
        <div className='menu-container'>
            <button onClick={handlePlay} className="play" name='play'>Play</button>
            <button onClick={handleHighscore} className="highscore" name='highscore'>Highscore</button>
            <button className="volume-toggle" onClick={handleVolumeToggle} name='musictoggle'>
                <img 
                    className='volume-toggle-img'
                    src={volumeToggle?volumeon:volumeoff} 
                    alt={volumeToggle?'turn volume off':'turn volume on'}
                />
            </button>
        </div>
    )
}
