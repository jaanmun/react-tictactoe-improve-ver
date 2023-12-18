import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);

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

  const currentHistory = history.at(-1);
  const winner = calculateWinner(currentHistory.squares);

  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next Player ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = i => {
    const newSquares = currentHistory.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) return;

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...history, { squares: newSquares }]);
    setXIsNext(current => !current);
  };

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="game-board">
        <Board squares={currentHistory.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">game-info</div>
    </div>
  );
}

export default App;
