import { nanoid } from "nanoid"
export function Highscore({ scoreArray }) {

    function TableRow({ name, score }) {
        return (
            <tr >
                <td>{name}</td>
                <td>{score}</td>
            </tr>
        )
    }

    function generateScoreArray() {
        return scoreArray.length > 0 ?
            <main>
                <h1 style={{textAlign:"center"}}>Highscore list</h1>
                <div className="highscore-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreArray.map(score => <TableRow key={nanoid()} name={score.name} score={score.score} />)}
                    </tbody>
                </table>
                </div>
            </main>
            : <h1 style={{textAlign:"center"}}>No scores yet</h1>

    }

    return (
        generateScoreArray() 
    )


}