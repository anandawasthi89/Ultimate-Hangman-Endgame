export function KeyElement({value,correct,handleKeyPressed}){
    const Styles = {backgroundColor: `${correct!=null?
                                        correct?"#10A95B":"#BA2A2A"
                                        :"rgb(208, 170, 243)"}`}
    return(
            <button 
                className='keyelement' 
                style={Styles}
                onClick={()=>handleKeyPressed(value)}
                disabled={correct!=null}>
                    {value}
            </button>
    )
}