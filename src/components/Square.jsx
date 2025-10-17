export default function Square({ value, onSquareClick, highlight = false }) {
  return (
    <button
      className={`square${highlight ? ' highlight' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
