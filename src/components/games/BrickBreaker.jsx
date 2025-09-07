import React, { useRef, useEffect, useState } from "react";
import "./BrickBreaker.css";
import gameOverSoundSrc from './sounds/gameover.mp3';


const BrickBreaker = () => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [resetFlag, setResetFlag] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef(new Audio(gameOverSoundSrc));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ball = { x: 240, y: 320, dx: 2, dy: -2 };
    let paddle = { x: 200, width: 75 };
    let bricks = [];

    const initBricks = () => {
      const rows = 3, cols = 5;
      const w = 75, h = 20, pad = 10, offsetX = 30, offsetY = 30;
      let b = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          b.push({ x: c * (w + pad) + offsetX, y: r * (h + pad) + offsetY, status: 1 });
        }
      }
      return b;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = theme === "dark" ? "#00eaff" : "#0095DD";
      ctx.fill();
      ctx.closePath();

      // Paddle
      ctx.beginPath();
      ctx.rect(paddle.x, canvas.height - 10, paddle.width, 10);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();

      // Bricks
      bricks.forEach((b) => {
        if (b.status) {
          ctx.beginPath();
          ctx.rect(b.x, b.y, 75, 20);
          ctx.fillStyle = theme === "dark" ? "#555" : "#00bcd4";
          ctx.fill();
          ctx.closePath();
        }
      });

      // Collision
      bricks.forEach((b) => {
        if (
          b.status &&
          ball.x > b.x &&
          ball.x < b.x + 75 &&
          ball.y > b.y &&
          ball.y < b.y + 20
        ) {
          ball.dy *= -1;
          b.status = 0;
        }
      });

      // Bounce Logic
      if (ball.x + ball.dx > canvas.width - 10 || ball.x + ball.dx < 10) ball.dx *= -1;
      if (ball.y + ball.dy < 10) ball.dy *= -1;
      else if (
        ball.y + ball.dy > canvas.height - 10 &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
      ) {
        ball.dy *= -1;
      } else if (ball.y + ball.dy > canvas.height) {
        resetGame();
        alert("Game Over");
      }

      ball.x += ball.dx;
      ball.y += ball.dy;
    };

    let interval = setInterval(draw, 10);

    const movePaddle = (e) => {
      if (e.key === "ArrowLeft") paddle.x -= 20;
      else if (e.key === "ArrowRight") paddle.x += 20;
    };

    const resetGame = () => {
      ball = { x: 240, y: 320, dx: 2, dy: -2 };
      paddle = { x: 200, width: 75 };
      bricks = initBricks();
    };

    bricks = initBricks();
    document.addEventListener("keydown", movePaddle);

    if (musicOn) {
      audioRef.current.loop = true;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", movePaddle);
      audioRef.current.pause();
    };
  }, [resetFlag, theme, musicOn]);

  return (
    <div className={`brickbreaker-wrapper ${theme}`}>
      <h2>🧱 Brick Breaker</h2>
      <canvas ref={canvasRef} width="480" height="320"></canvas>
      <div className="controls">
        <button onClick={() => setResetFlag(prev => !prev)}>🔁 Reset</button>
        <button onClick={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}>🌓 Theme</button>
        <button onClick={() => setMusicOn(prev => !prev)}>{musicOn ? "🔇 Mute" : "🔊 Sound"}</button>
      </div>
    </div>
  );
};

export default BrickBreaker;

