import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [checked, setChecked] = useState('');

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const currentHistory = history[stepNumber];
  const winner = calculateWinner(currentHistory.squares);

  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next Player ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrentHistory = newHistory[newHistory.length - 1];
    const newSquares = newCurrentHistory.squares.slice();
    if (checked !== '') setChecked('');
    if (calculateWinner(newSquares) || newSquares[i]) return;

    newSquares[i] = xIsNext ? 'X' : 'O';

    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext(current => !current);
    setStepNumber(newHistory.length);
  };

  const handleChange = id => {
    setChecked(id);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((_, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start';
    return (
      <li key={step}>
        <input
          hidden
          type="radio"
          id={`stage${step}`}
          name="radio-stage"
          checked={checked === `stage${step}`}
          onChange={() => handleChange(`stage${step}`)}
        ></input>
        <label htmlFor={`stage${step}`} onClick={() => jumpTo(step)}></label>
        <button className="move-button">{desc}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <header className="app-header">
          <h1>Tic-Tac-Toe improve ver.</h1>
        </header>
        <div className="game-board">
          <Board squares={currentHistory.squares} onClick={i => handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default App;
