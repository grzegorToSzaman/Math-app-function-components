import React, {useState, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import Operation from "./Operation";
import Answer from "./Answer";
import Score from "./Score";

/*
function useInterval(width) {
    setWidth(100);
    let intervalID = setInterval( () => {
        if (width > 0) {
            setWidth(width - 1);
        } else {
            clearInterval(intervalID);
            checkAnswer();
        }
    })
}
*/

function Game(props) {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [width, setWidth] = useState(0);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [bestScores, setBestScores] = useState([]);

    const randomNumber = () => {
        let c = Math.round(Math.random()*(this.state.level * 10));
        let d = Math.round(Math.random()*(this.state.level * 10));
        setA(c);
        setB(d);
        setCorrectAnswer(c+d);
    };
    let intervalID;

    const startInterval = () => {
        setWidth(100);
        intervalID = setInterval( () => {
            if (width > 0) {
                setWidth(width - 1);
            } else {
                clearInterval(intervalID);
                checkAnswer();
            }
        })
    };

    const checkAnswer = () => {
        if (answer == correctAnswer) {
            clearInterval(intervalID);
            setScore(score + 1);
            setAnswer('');
            setLevel(Math.ceil(score / 5));
            randomNumber();
            startInterval();
        } else {
            props.score(score);
            props.gameover();
            bestScores.length !== 0 && checkHighScores();
        }
    };

    const checkHighScores = () => {
        const apiURL = 'http://localhost:3010/bestScores/';
        const newFetch = number => {

            fetch(apiURL + number, {
                headers:{
                    "Content-Type": "application/json"
                },
                method:"PUT",
                body:JSON.stringify({name: props.userName, score: score})
            }).then(r=>{
                console.log(r)
            }).catch(err=>{
                console.warn(err)
            })
        };

        if (bestScores.length === 0) {
            return null
        } else {
            if (score > bestScores[0].score) {
                bestScores[0].score = score;
                bestScores[0].name = props.userName;
                newFetch(1);
            } else if (score > bestScores[1].score) {
                bestScores[1].score = score;
                bestScores[1].name = props.userName;
                newFetch(2);
            } else if (score > bestScores[2].score) {
                bestScores[2].score = score;
                bestScores[2].name = props.userName;
                newFetch(3);
            }else{
                console.log("spadaj na drzewo")
            }

            props.highScores(bestScores);
        }

    };

    useEffect( () => {
        randomNumber();
        startInterval();
    });
    useEffect( () => {
        const apiURL = 'http://localhost:3010/bestScores/';
        fetch(apiURL)
            .then(r => r.json())
            .then(r => {
                setBestScores(r);
            })
            .catch(err => {
                console.warn(err);
            })
    }, [bestScores]);

    return (
        <div className='game'>
            <ProgressBar width={width}/>
            <Operation a={a} b={b}/>
            <Answer answer={setAnswer} zeroInput={answer} enter={checkAnswer}/>
            <Score score={score} level={level}/>
        </div>
    )
}

export default Game;