const ChallengeWords = ({value,points}) => {
    const Styles={
        backgroundColor: `${points===0?"rgb(208, 170, 243)": points>0?"#10A95B":"#BA2A2A"}`
    }

    return (
            <span className="penalty" style={Styles} >{value}</span>
    )
}

export default ChallengeWords