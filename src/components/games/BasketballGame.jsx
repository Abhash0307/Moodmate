// import React, { useRef, useEffect, useState } from "react";
// import "./BasketballGame.css";

// const BasketballGame = () => {
//   const canvasRef = useRef(null);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let ballY = 250;
//     let ballX = 200;
//     let dy = -4;
//     let inAir = false;

//     const hoop = { x: 150, y: 50, width: 100, height: 10 };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       ctx.fillStyle = "#f44336";
//       ctx.beginPath();
//       ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
//       ctx.fill();

//       ctx.fillStyle = "#333";
//       ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

//       if (inAir) {
//         ballY += dy;
//         if (ballY < 60 && ballX > hoop.x && ballX < hoop.x + hoop.width) {
//           setScore(prev => prev + 1);
//           inAir = false;
//           resetBall();
//         }
//         if (ballY < 0) inAir = false;
//       }
//     };

//     const resetBall = () => {
//       ballY = 250;
//       dy = -4;
//     };

//     const shoot = () => {
//       if (!inAir) {
//         inAir = true;
//         resetBall();
//       }
//     };

//     canvas.addEventListener("click", shoot);
//     const interval = setInterval(draw, 30);

//     return () => {
//       clearInterval(interval);
//       canvas.removeEventListener("click", shoot);
//     };
//   }, []);

//   return (
//     <div className="basketball-wrapper">
//       <h2>🏀 Basketball Game</h2>
//       <canvas ref={canvasRef} width="400" height="300"></canvas>
//       <h3>Score: {score}</h3>
//       <p>Click on the canvas to shoot!</p>
//     </div>
//   );
// };

// export default BasketballGame;

import React, { useEffect, useRef, useState } from "react";
import "./BasketballGame.css";
import shootSoundFile from "./sounds/shoot.mp3";
import scoreSoundFile from "./sounds/score.mp3";

const BasketballGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [ball, setBall] = useState({ x: 200, y: 400, dx: 0, dy: 0, shooting: false });
  const [dragStart, setDragStart] = useState(null);
  const [hasScored, setHasScored] = useState(false);
  const [theme, setTheme] = useState("light");
  const [soundOn, setSoundOn] = useState(true);

  const hoop = { x: 160, y: 60, width: 80, height: 10 };

  const shootSound = useRef(new Audio(shootSoundFile));
  const scoreSound = useRef(new Audio(scoreSoundFile));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hoop
      ctx.fillStyle = theme === "dark" ? "#fff" : "#000";
      ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

      // Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5722";
      ctx.fill();
      ctx.closePath();
    };

    const update = () => {
      if (ball.shooting) {
        const newX = ball.x + ball.dx;
        const newY = ball.y + ball.dy;
        const newDy = ball.dy + 0.25; // gravity

        if (
          !hasScored &&
          ball.dy > 0 &&
          newY >= hoop.y &&
          newY <= hoop.y + hoop.height + 10 &&
          newX >= hoop.x &&
          newX <= hoop.x + hoop.width
        ) {
          setHasScored(true);
          setScore((prev) => prev + 1);
          if (soundOn) scoreSound.current.play();
        }

        if (newY > canvas.height || newX < 0 || newX > canvas.width) {
          resetBall();
        } else {
          setBall({ ...ball, x: newX, y: newY, dy: newDy });
        }
      }
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(loop);
  }, [ball, theme, soundOn, hasScored]);

  const resetBall = () => {
    setBall({ x: 200, y: 400, dx: 0, dy: 0, shooting: false });
    setHasScored(false);
  };

  const resetGame = () => {
    resetBall();
    setScore(0);
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: x - rect.left,
      y: y - rect.top,
    };
  };

  const handleStart = (e) => {
    setDragStart(getCanvasCoordinates(e));
  };

  const handleEnd = (e) => {
    if (!dragStart) return;
    const endCoords = getCanvasCoordinates(e);
    const dx = (dragStart.x - endCoords.x) / 5;
    const dy = (dragStart.y - endCoords.y) / 5;

    setBall({ ...ball, dx, dy, shooting: true });
    setHasScored(false);
    setDragStart(null);

    if (soundOn) shootSound.current.play();
  };

  return (
    <div className={`basketball-game ${theme}`}>
      <h2>🏀 Basketball Challenge</h2>
      <p>🎯 Score: {score}</p>

      <canvas
        ref={canvasRef}
        width={400}
        height={450}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        style={{ touchAction: "none" }}
      />

      <div className="game-controls">
        <button onClick={resetGame}>🔁 Reset</button>
        <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
          🌓 Theme: {theme}
        </button>
        <button onClick={() => setSoundOn((s) => !s)}>
          {soundOn ? "🔊 Sound On" : "🔇 Sound Off"}
        </button>
      </div>
    </div>
  );
};

export default BasketballGame;
