import React, {useEffect} from "react";
import HighScores from "./HighScores";
import Flash from "react-reveal/Flash";
import Jump from "react-reveal/Jump";
import Pulse from "react-reveal/Pulse";


function GameOver(props) {
    const keyDown = e => {
        e.key === 'Enter' && newGame();
    };
    const newGame = () => {
        props.ready();
    };
    useEffect( () => {
        document.addEventListener('keydown', keyDown);
        return () => {
            document.removeEventListener('keydown', keyDown);
        }
    });
    return (
        <div className='game-over'>
            <Flash>
                <h1>GAME OVER</h1>
            </Flash>
            <Jump delay={1000}>
                <h2>Your score: {props.score}</h2>
            </Jump>
            {props.bestScores.length === 0 ? null : <HighScores bestScore={props.bestScores}/>}
            <Pulse delay={2000} count={3}>
                <button onClick={newGame}>AGAIN!</button>
            </Pulse>
        </div>
    )
}

export default GameOver