import { useState } from 'react';
import Board from './Board';

export default function Game() {
  // Mỗi bước lưu cả bàn cờ và vị trí vừa đánh
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), position: null }, // move #0 chưa có vị trí
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [asc, setAsc] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, i) {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;

    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, position: { row, col } },
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    const loc = step.position
      ? ` (${step.position.row}, ${step.position.col})`
      : '';
    const isCurrent = move === currentMove;

    const desc = move ? `Go to move #${move}${loc}` : 'Go to game start';

    return (
      <div key={move}>
        {isCurrent ? (
          <span>
            You are at move #{move}
            {loc}
          </span>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </div>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <button className="sort-button" onClick={() => setAsc((a) => !a)}>
        Sort: {asc ? 'Ascending' : 'Descending'}
      </button>

      <div className="game-info">{asc ? moves : [...moves].reverse()}</div>
    </div>
  );
}
