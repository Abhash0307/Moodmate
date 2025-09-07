// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginRegister from './components/LoginRegister';
// import WelcomeScreen from './components/WelcomeScreen';
// import Navbar from './components/Navbar';
// import EmotionScanner from "./components/EmotionScanner";
// import ChatBotUI from "./components/ChatBotUI";
// import GameZone from './components/GameZone'; 
// import MovieMusicRecommendation from './components/MovieMusicRecommendation';


// function App() {
  
//   return (
//     <Router>
//         <Navbar />
//       <Routes>
//          <Route path="/" element={<LoginRegister />} />
//         <Route path="/welcomscreen" element={<WelcomeScreen/>} />
        
//          <Route path="/scanner" element={<EmotionScanner />} />
//           <Route path="/chatbot" element={<ChatBotUI />} />
//            <Route path="/gamezone" element={<GameZone />} />
//             <Route path="/entertainment" element={<MovieMusicRecommendation />} />
            
//       </Routes>
//     </Router>
   
//   );
// }

// export default App;


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from './components/LoginRegister';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import EmotionScanner from "./components/EmotionScanner";
import ChatBotUI from "./components/ChatBotUI";
import GameZone from './components/GameZone'; 
import TicTacToe from './components/games/TicTacToe';
import MemoryGame from './components/games/MemoryGame';
import QuizGame from './components/games/QuizGame';
import SnakeGame from './components/games/SnakeGame';
import BasketballGame from './components/games/BasketballGame';
import BrickBreaker from './components/games/BrickBreaker';
import Game2048 from './components/games/Game2048';
import MovieMusicRecommendation from './components/MovieMusicRecommendation';
import MusicRecommendation from './components/MusicRecommendation';
import HealingHub from './components/HealingHub';
import './App.css'; // App container styling


function App() {
  return (
     
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/welcomscreen" element={<WelcomeScreen />} />
          <Route path="/scanner" element={<EmotionScanner />} />
          <Route path="/chatbot" element={<ChatBotUI />} />
          <Route path="/gamezone" element={<GameZone />} />
          <Route path="/game/tictactoe" element={<TicTacToe />} />
          <Route path="/game/memory" element={<MemoryGame />} />
          <Route path="/game/quiz" element={<QuizGame />} />
          <Route path="/game/snake" element={<SnakeGame />} />
           <Route path="/game/BrickBreaker" element={< BrickBreaker/>} />
          <Route path="/game/basketball" element={<BasketballGame />} />
          <Route path="/game/2048" element={<Game2048 />} />
          <Route path="/entertainment" element={<MovieMusicRecommendation />} />
          <Route path="/music" element={<MusicRecommendation />} />
          <Route path="/healinghub" element={<HealingHub />} />
        </Routes>
      </div>
    </Router>
    



  );

}

export default App;

