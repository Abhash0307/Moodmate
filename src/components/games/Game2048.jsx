
// import React, { useState, useEffect } from "react";
// import "./Game2048.css";

// const createGrid = () => {
//   let grid = Array(4)
//     .fill(0)
//     .map(() => Array(4).fill(0));
//   addNewTile(grid);
//   addNewTile(grid);
//   return grid;
// };

// const addNewTile = (grid) => {
//   let empty = [];
//   grid.forEach((row, i) =>
//     row.forEach((val, j) => {
//       if (val === 0) empty.push([i, j]);
//     })
//   );
//   if (empty.length > 0) {
//     const [i, j] = empty[Math.floor(Math.random() * empty.length)];
//     grid[i][j] = Math.random() < 0.9 ? 2 : 4;
//   }
// };

// const Game2048 = () => {
//   const [grid, setGrid] = useState(createGrid());

//   const handleKey = (e) => {
//     let newGrid = JSON.parse(JSON.stringify(grid));

//     const slide = (row) => {
//       let arr = row.filter(val => val);
//       for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i] === arr[i + 1]) {
//           arr[i] *= 2;
//           arr[i + 1] = 0;
//         }
//       }
//       return [...arr.filter(val => val), ...Array(4 - arr.filter(val => val).length).fill(0)];
//     };

//     const rotate = (g) => g[0].map((_, i) => g.map(row => row[i])).reverse();

//     switch (e.key) {
//       case "ArrowLeft":
//         newGrid = newGrid.map(slide);
//         break;
//       case "ArrowRight":
//         newGrid = newGrid.map(row => slide(row.reverse()).reverse());
//         break;
//       case "ArrowUp":
//         newGrid = rotate(rotate(rotate(newGrid.map(slide))));
//         break;
//       case "ArrowDown":
//         newGrid = rotate(newGrid.map(row => slide(row.reverse()).reverse()));
//         break;
//       default:
//         return;
//     }

//     addNewTile(newGrid);
//     setGrid(newGrid);
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [grid]);

//   return (
//     <div className="game2048-container">
//       <h2>🔢 2048 Game</h2>
//       <div className="grid">
//         {grid.map((row, i) =>
//           row.map((val, j) => (
//             <div key={`${i}-${j}`} className={`tile tile-${val}`}>
//               {val !== 0 ? val : ""}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Game2048;



import React, { useEffect, useState } from 'react';
import './Game2048.css';

const generateGrid = () => {
  const grid = Array(4).fill(null).map(() => Array(4).fill(0));
  addRandom(grid);
  addRandom(grid);
  return grid;
};

const addRandom = (grid) => {
  let empty = [];
  grid.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === 0) empty.push({ r, c });
    });
  });
  if (empty.length === 0) return;
  const spot = empty[Math.floor(Math.random() * empty.length)];
  grid[spot.r][spot.c] = Math.random() > 0.5 ? 2 : 4;
};

const Game2048 = () => {
  const [grid, setGrid] = useState(generateGrid);
  const [theme, setTheme] = useState('light');

  const resetGame = () => {
    setGrid(generateGrid());
  };

  useEffect(() => {
    const handleKey = (e) => {
      let moved = false;
      const clone = grid.map(row => row.slice());

      const slide = (row) => {
        row = row.filter(val => val);
        for (let i = 0; i < row.length - 1; i++) {
          if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
          }
        }
        return row.filter(val => val).concat(Array(4 - row.length).fill(0));
      };

      const rotate = (mat) => mat[0].map((_, i) => mat.map(row => row[i]));

      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        let rotated = clone;
        if (e.key === "ArrowUp") rotated = rotate(clone).map(slide);
        if (e.key === "ArrowDown") rotated = rotate(clone).map(row => slide(row.reverse()).reverse());
        if (e.key === "ArrowLeft") rotated = clone.map(slide);
        if (e.key === "ArrowRight") rotated = clone.map(row => slide(row.reverse()).reverse());

        const reverted = e.key.includes("Up") || e.key.includes("Down")
          ? rotate(rotated)
          : rotated;

        if (JSON.stringify(clone) !== JSON.stringify(reverted)) {
          addRandom(reverted);
          setGrid(reverted);
          moved = true;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid]);

  return (
    <div className={`game2048-wrapper ${theme}`}>
      <h2>🔢 2048 Game</h2>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="row" key={i}>
            {row.map((num, j) => (
              <div className={`tile ${num}`} key={j}>
                {num !== 0 ? num : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={resetGame}>🔁 Reset</button>
        <button onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>🌓 Theme</button>
      </div>
    </div>
  );
};

export default Game2048;

