import React, {useState, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import Operation from "./Operation";
import Answer from "./Answer";
import Score from "./Score";


function Game(props) {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [bestScores, setBestScores] = useState([]);

    useEffect( () => {
        const randomNumber = () => {
            let c = Math.round(Math.random()*(level * 10));
            let d = Math.round(Math.random()*(level * 10));
            setA(c);
            setB(d);
            setCorrectAnswer(c+d);
        };
        randomNumber();

        score !== 0 && setLevel(Math.ceil(score / 5))

    }, [score, level]);

    const checkAnswer = () => {
        if (parseInt(answer) === correctAnswer) {
            // clearInterval(intervalID);
            setScore(score + 1);
            setAnswer('');
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
        const apiURL = 'http://localhost:3010/bestScores/';
        fetch(apiURL)
            .then(r => r.json())
            .then(r => {
                setBestScores(r);
            })
            .catch(err => {
                console.warn(err);
            })
    }, []);

    return (
        <div className='game'>
            <ProgressBar score={score} checkAnswer={checkAnswer}/>
            <Operation a={a} b={b}/>
            <Answer answer={setAnswer} zeroInput={answer} enter={checkAnswer}/>
            <Score score={score} level={level}/>
        </div>
    )
}

export default Game;