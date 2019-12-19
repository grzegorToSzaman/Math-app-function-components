import React from "react";
import Fade from "react-reveal/Fade";

function Score({score, level}) {
    return (
        <div className='score'>
            <Fade right duration={1500}>
                <h1>Score: {score}</h1>
                <h1>Level: {level}</h1>
            </Fade>
        </div>
    )
}

export default Score;

