// components/games/TicTacToe.jsx
import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = turn;
    const win = checkWinner(newBoard);
    setBoard(newBoard);
    if (win) setWinner(win);
    setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
  };

  return (
    <div className="ttt-container">
      <h2>Tic Tac Toe</h2>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <div key={i} className="ttt-cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && <p className="ttt-winner">{winner} Wins!</p>}
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
