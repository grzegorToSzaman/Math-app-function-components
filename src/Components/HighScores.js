import React from "react";

function HighScores(props) {
    return (
        <div>
            {props.bestScore.map(player => {
                return(
                    <div className='high-scores' key={player.id}>
                        {player.name} {player.score}
                    </div>
                )
            })}
        </div>
    )
}

export default HighScores