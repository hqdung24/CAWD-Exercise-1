import Square from './Square';
function calculateWinner(sq) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // hàng
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cột
    [0, 4, 8],
    [2, 4, 6], // chéo
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function Board({ xIsNext, squares, onPlay }) {
  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  if (isDraw) {
    status = 'DRAWWWW';
  }

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares, i);
  }
  function renderSquare(i, winningline) {
    const highlight = winningline && winningline.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={highlight}
      />
    );
  }
  const rows = [];
  for (let r = 0; r < 3; r++) {
    const cols = [];
    for (let c = 0; c < 3; c++) {
      cols.push(renderSquare(r * 3 + c, line));
    }
    rows.push(
      <div className="board-row" key={r}>
        {cols}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <div>{rows}</div>
    </>
  );
}

export default Board;
