// import React from 'react';
// import './GameZone.css'; // create this file too

// const games = [
//   {
//     name: "Relaxing Bubbles",
//     url: "https://games.crazygames.com/en_US/bubble-shooter",
//     description: "A calming bubble shooter to unwind your mind.",
//   },
//   {
//     name: "Zen Puzzle",
//     url: "https://www.mathplayground.com/logic_puzzle_games.html",
//     description: "Challenge your brain gently with puzzles.",
//   },
//   {
//     name: "Cute Cat Game",
//     url: "https://www.crazygames.com/game/cat-clicker-re",
//     description: "Click a cat and feel joy instantly!",
//   },
// ];

// const GameZone = () => {
//   return (
//     <div className="game-zone">
//       <h2>🎮 MoodMate GameZone</h2>
//       <p>Let’s play something to lift your mood!</p>
//       <div className="game-list">
//         {games.map((game, index) => (
//           <div className="game-card" key={index}>
//             <h3>{game.name}</h3>
//             <p>{game.description}</p>
//             <a href={game.url} target="_blank" rel="noopener noreferrer">
//               ▶️ Play Game
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GameZone;



// components/GameZone.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './GameZone.css';

// const games = [
//   { title: '🎲 Tic Tac Toe', route: '/game/tictactoe', image: '/images/tictactoe.png' },
//   { title: '🧠 Memory Game', route: '/game/memory', image: '/images/memory.png' },
//   { title: '❓ Quiz Game', route: '/game/quiz', image: '/images/quiz.png' },
//   { title: '🐍 Snake Game', route: '/game/snake', image: '/images/snake.png' },
//   { title: "🧱 Brick Breaker", route: "/brickbreaker" },
//   { title: "🔢 2048", route: "/2048" },
//   { title: "🏀 Basketball", route: "/basketball" }
// ];

// const GameZone = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="gamezone-container">
//       <h2>🎮 Let's Play a Game!</h2>
//       <div className="game-grid">
//         {games.map((game, idx) => (
//           <div key={idx} className="game-card" onClick={() => navigate(game.route)}>
//             <img src={game.image} alt={game.title} />
//             <h4>{game.title}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GameZone;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameZone.css';

const games = [
  { title: '🎲 Tic Tac Toe', route: '/game/tictactoe' },
  { title: '🧠 Memory Game', route: '/game/memory' },
  { title: '❓ Quiz Game', route: '/game/quiz' },
  { title: '🐍 Snake Game', route: '/game/snake' },
  { title: '🧱 Brick Breaker', route: '/game/BrickBreaker' },
  { title: '🔢 2048', route: '/game/2048'},
  { title: '🏀 Basketball', route: '/game/basketball' },
  // External games
  { title: '🎮 Dino Game', route: 'https://elgoog.im/dinosaur-game/', type: 'external' },
  { title: '💣 Minesweeper', route: 'https://minesweeper.online/', type: 'external' },
  { title: '🧩 Sudoku', route: 'https://sudoku.com', type: 'external' },
  { title: '🪁 Flappy Bird', route: 'https://flappybird.io/',  type: 'external' },
  { title: '🎯 Bubble Shooter', route: 'https://bubbleshooter.net/',  type: 'external' }
];


const GameZone = () => {
  const navigate = useNavigate();

  return (
    <div className="game-grid">
  {games.map((game, idx) => (
    <div
      key={idx}
      className="game-card"
      onClick={() =>
        game.type === 'external'
          ? window.open(game.route, "_blank")
          : navigate(game.route)
      }
    >
      
      <h4>{game.title}</h4>
    </div>
  ))}
</div>

  );
};

export default GameZone;


