// // components/games/SnakeGame.jsx
// import React, { useEffect, useRef } from 'react';
// import './SnakeGame.css';

// const SnakeGame = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     const box = 20;
//     let snake = [{ x: 10 * box, y: 10 * box }];
//     let direction = "RIGHT";
//     let food = {
//       x: Math.floor(Math.random() * 25) * box,
//       y: Math.floor(Math.random() * 25) * box,
//     };

//     const draw = () => {
//       ctx.fillStyle = "#f9f9f9";
//       ctx.fillRect(0, 0, 500, 500);

//       for (let i = 0; i < snake.length; i++) {
//         ctx.fillStyle = i === 0 ? "#3498db" : "#2ecc71";
//         ctx.fillRect(snake[i].x, snake[i].y, box, box);
//       }

//       ctx.fillStyle = "red";
//       ctx.fillRect(food.x, food.y, box, box);

//       let headX = snake[0].x;
//       let headY = snake[0].y;

//       if (direction === "LEFT") headX -= box;
//       if (direction === "UP") headY -= box;
//       if (direction === "RIGHT") headX += box;
//       if (direction === "DOWN") headY += box;

//       if (headX === food.x && headY === food.y) {
//         food = {
//           x: Math.floor(Math.random() * 25) * box,
//           y: Math.floor(Math.random() * 25) * box,
//         };
//       } else {
//         snake.pop();
//       }

//       const newHead = { x: headX, y: headY };

//       if (
//         headX < 0 || headX >= 500 || headY < 0 || headY >= 500 ||
//         snake.some((s) => s.x === newHead.x && s.y === newHead.y)
//       ) {
//         alert("Game Over!");
//         snake = [{ x: 10 * box, y: 10 * box }];
//         direction = "RIGHT";
//         return;
//       }

//       snake.unshift(newHead);
//     };

//     const control = (e) => {
//       if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
//       else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
//       else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
//       else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
//     };

//     document.addEventListener("keydown", control);
//     const game = setInterval(draw, 120);
//     return () => clearInterval(game);
//   }, []);

//   return (
//     <div className="snake-wrapper">
//       <h2>🐍 Snake Game</h2>
//       <canvas ref={canvasRef} width="500" height="500" />
//     </div>
//   );
// };

// export default SnakeGame;



// src/components/games/SnakeGame.jsx
// import React, { useRef, useEffect, useState } from "react";
// import "./SnakeGame.css";

// const SnakeGame = () => {
//   const canvasRef = useRef(null);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const box = 20;
//     const canvasSize = 25; // 25x25 boxes
//     let snake = [{ x: 10 * box, y: 10 * box }];
//     let direction = "RIGHT";
//     let food = randomFood();
//     let gameOver = false;

//     function randomFood() {
//       return {
//         x: Math.floor(Math.random() * canvasSize) * box,
//         y: Math.floor(Math.random() * canvasSize) * box,
//       };
//     }

//     const draw = () => {
//       if (gameOver) return;

//       // clear
//       ctx.fillStyle = "#f8f9fa";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // draw snake
//       for (let i = 0; i < snake.length; i++) {
//         ctx.fillStyle = i === 0 ? "#2c3e50" : "#27ae60";
//         ctx.fillRect(snake[i].x, snake[i].y, box, box);
//       }

//       // draw food
//       ctx.fillStyle = "#e74c3c";
//       ctx.fillRect(food.x, food.y, box, box);

//       // move head
//       let headX = snake[0].x;
//       let headY = snake[0].y;

//       if (direction === "LEFT") headX -= box;
//       if (direction === "RIGHT") headX += box;
//       if (direction === "UP") headY -= box;
//       if (direction === "DOWN") headY += box;

//       // collision with wall
//       if (
//         headX < 0 || headX >= canvas.width ||
//         headY < 0 || headY >= canvas.height
//       ) {
//         endGame();
//         return;
//       }

//       // collision with body
//       for (let i = 1; i < snake.length; i++) {
//         if (headX === snake[i].x && headY === snake[i].y) {
//           endGame();
//           return;
//         }
//       }

//       // eat food
//       let ateFood = headX === food.x && headY === food.y;
//       if (ateFood) {
//         setScore(prev => prev + 1);
//         food = randomFood();
//       } else {
//         snake.pop();
//       }

//       const newHead = { x: headX, y: headY };
//       snake.unshift(newHead);
//     };

//     function endGame() {
//       gameOver = true;
//       ctx.fillStyle = "rgba(0,0,0,0.6)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#fff";
//       ctx.font = "24px Arial";
//       ctx.fillText("Game Over!", canvas.width / 2 - 70, canvas.height / 2);
//     }

//     const control = (e) => {
//       const key = e.key;
//       if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
//       if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
//       if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
//       if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
//     };

//     document.addEventListener("keydown", control);
//     const game = setInterval(draw, 100);
//     return () => {
//       clearInterval(game);
//       document.removeEventListener("keydown", control);
//     };
//   }, []);

//   return (
//     <div className="snake-wrapper">
//       <h2>🐍 Snake Game</h2>
//       <p>Score: {score}</p>
//       <canvas
//         ref={canvasRef}
//         width="500"
//         height="500"
//         className="snake-canvas"
//       />
//     </div>
//   );
// };

// export default SnakeGame;





// src/components/games/SnakeGame.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import './SnakeGame.css';

// const SnakeGame = () => {
//   const canvasRef = useRef(null);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [direction, setDirection] = useState("RIGHT");
//   const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
//   const [food, setFood] = useState(randomFood());

//   const box = 20;
//   const canvasSize = 500;

//   function randomFood() {
//     return {
//       x: Math.floor(Math.random() * (canvasSize / box)) * box,
//       y: Math.floor(Math.random() * (canvasSize / box)) * box
//     };
//   }


// import React, { useEffect, useRef, useState } from 'react';
// import './SnakeGame.css';

// const SnakeGame = () => {
//   const canvasRef = useRef(null);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [direction, setDirection] = useState("RIGHT");

//   const box = 20;
//   const canvasSize = 500;

//   // ✅ Now canvasSize is available for use
//   function randomFood() {
//     return {
//       x: Math.floor(Math.random() * (canvasSize / box)) * box,
//       y: Math.floor(Math.random() * (canvasSize / box)) * box
//     };
//   }

//   const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
//   const [food, setFood] = useState(randomFood());

//   const resetGame = () => {
//     setScore(0);
//     setSnake([{ x: 200, y: 200 }]);
//     setFood(randomFood());
//     setDirection("RIGHT");
//     setGameOver(false);
//   };

//   useEffect(() => {
//     const handleKey = (e) => {
//       const key = e.key;
//       if (key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
//       else if (key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
//       else if (key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
//       else if (key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
//     };

//     document.addEventListener("keydown", handleKey);

//     return () => document.removeEventListener("keydown", handleKey);
//   }, [direction]);

//   useEffect(() => {
//     if (gameOver) return;

//     const interval = setInterval(() => {
//       const newSnake = [...snake];
//       let head = { ...newSnake[0] };

//       if (direction === "RIGHT") head.x += box;
//       if (direction === "LEFT") head.x -= box;
//       if (direction === "UP") head.y -= box;
//       if (direction === "DOWN") head.y += box;

//       // Collision with wall
//       if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
//         setGameOver(true);
//         return;
//       }

//       // Collision with self
//       for (let i = 1; i < newSnake.length; i++) {
//         if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
//           setGameOver(true);
//           return;
//         }
//       }

//       newSnake.unshift(head);

//       // Eat food
//       if (head.x === food.x && head.y === food.y) {
//         setScore(score + 1);
//         setFood(randomFood());
//       } else {
//         newSnake.pop(); // Remove tail if not eating
//       }

//       setSnake(newSnake);
//     }, 100);

//     return () => clearInterval(interval);
//   }, [snake, direction, gameOver]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Clear
//     ctx.fillStyle = "#fefefe";
//     ctx.fillRect(0, 0, canvasSize, canvasSize);

//     // Draw food
//     ctx.fillStyle = "#e74c3c";
//     ctx.fillRect(food.x, food.y, box, box);

//     // Draw snake
//     for (let i = 0; i < snake.length; i++) {
//       ctx.fillStyle = i === 0 ? "#2c3e50" : "#27ae60";
//       ctx.fillRect(snake[i].x, snake[i].y, box, box);
//     }

//     // Game over text
//     if (gameOver) {
//       ctx.fillStyle = "rgba(0,0,0,0.6)";
//       ctx.fillRect(0, 0, canvasSize, canvasSize);
//       ctx.fillStyle = "#fff";
//       ctx.font = "26px Arial";
//       ctx.fillText("Game Over!", 180, 240);
//     }
//   }, [snake, food, gameOver]);

//   return (
//     <div className="snake-wrapper">
//       <h2>🐍 Snake Game</h2>
//       <p>Score: {score}</p>
//       <canvas
//         ref={canvasRef}
//         width={canvasSize}
//         height={canvasSize}
//         className="snake-canvas"
//       />
//       {gameOver && (
//         <button className="restart-btn" onClick={resetGame}>🔄 Restart</button>
//       )}
//     </div>
//   );
// };

// export default SnakeGame;




import React, { useEffect, useRef, useState } from 'react';
import './SnakeGame.css';
import eatSoundSrc from './sounds/eat.mp3';
import gameOverSoundSrc from './sounds/gameover.mp3';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const box = 20;
  const canvasSize = 500;

  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("snakeHighScore")) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [theme, setTheme] = useState("light");

  const eatSound = new Audio(eatSoundSrc);
  const gameOverSound = new Audio(gameOverSoundSrc);

  function generateFood() {
    return {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  }

  const resetGame = () => {
    setScore(0);
    setSnake([{ x: 200, y: 200 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setGameOver(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      else if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      else if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      else if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "UP": head.y -= box; break;
        case "DOWN": head.y += box; break;
        case "LEFT": head.x -= box; break;
        case "RIGHT": head.x += box; break;
        default: break;
      }

      // Wall collision
      if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        setGameOver(true);
        gameOverSound.play();
        return;
      }

      // Self collision
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          gameOverSound.play();
          return;
        }
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        eatSound.play();
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snakeHighScore", newScore);
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, 100);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = theme === "light" ? "#fefefe" : "#1e1e1e";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#34495e" : "#2ecc71";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    if (gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.fillStyle = "#fff";
      ctx.font = "26px Arial";
      ctx.fillText("Game Over!", 180, 250);
    }
  }, [snake, food, theme, gameOver]);

  return (
    <div className={`snake-wrapper ${theme}`}>
      <div className="snake-header">
        <h2>🐍 Snake Game</h2>
        <div className="score">
          Score: {score} | High Score: {highScore}
        </div>
      </div>

      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="snake-canvas" />

      <div className="snake-controls">
        {gameOver && <button onClick={resetGame}>🔄 Restart</button>}
        <button onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}>
          🌗 Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
