export function Blanks({value,display}){
    return(
            <input className="blanksinput" value={display?value:""} readOnly />
    )
}