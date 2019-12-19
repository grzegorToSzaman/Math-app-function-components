import React, {useState, useEffect} from 'react';
import WelcomeWindow from './WelcomeWindow';
import Game from './Game';
import GameOver from './GameOver';

function App() {
    const [score, setScore] = useState(0);
    const [welcomeWindow, setWelcomeWindow] = useState(true);
    const [appWindow, setAppWindow] = useState(false);
    const [gameOverWindow, setGameOverWindow] = useState(false);
    const [userName, setUserName] = useState('GallAnonim');
    const [bestScores, setBestScores] = useState([]);

    const readyToGame = () => {
        setWelcomeWindow(false);
        setAppWindow(true);
        setGameOverWindow(false);
    };
    const gameOver = () => {
        setWelcomeWindow(false);
        setAppWindow(false);
        setGameOverWindow(true);
    };

  return (
      <div className="App">
          {welcomeWindow && <WelcomeWindow close={readyToGame} userName={setUserName}/>}
          {appWindow && <Game gameover={gameOver} score={setScore} userName={userName} highScores={setBestScores}/>}
          {gameOverWindow && <GameOver score={score} ready={readyToGame} bestScores={bestScores}/>}
      </div>
  );
}

export default App;
