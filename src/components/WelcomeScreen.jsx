// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './WelcomeScreen.css';

// const WelcomeScreen = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const message = new SpeechSynthesisUtterance(
//       "Hi there! I'm MoodMate. I'm here for you. Whenever you're ready, let's check how you're feeling and make your day better."
//     );
//     message.rate = 0.9;
//     message.pitch = 1;
//     message.lang = 'en-IN';
//     window.speechSynthesis.speak(message);
//   }, []);

//   const handleStart = () => {
//     navigate('/scanner');
//   };
 

//   return (
//     <div className="welcome-wrapper">
//       <div className="welcome-box">
//         <h1>💙 Welcome to MoodMate</h1>
//         <p>Your AI companion who listens, understands, and lifts your mood.</p>
//         <button onClick={handleStart}>💫 Let’s Begin</button>
//       </div>
//     </div>
//   );
// };

// export default WelcomeScreen;

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './WelcomeScreen.css';

// const features = [
//   {
//     icon: "📸",
//     title: "Emotion Scanner",
//     desc: "Scan your mood with camera & AI to detect how you feel.",
//     route: "/scanner"
//   },
//   {
//     icon: "🤖",
//     title: "AI Friend Chatbot",
//     desc: "An AI that listens and comforts you in natural human language.",
//     route: "/chatbot"
//   },
//   {
//     icon: "🎵",
//     title: "Music & Movie",
//     desc: "Get recommendations to boost your mood instantly.",
//     route: "/entertainment"
//   },
//   {
//     icon: "🎮",
//     title: "Game Zone",
//     desc: "Play light, fun games to relax your mind.",
//     route: "/gamezone"
//   }
// ];

// const WelcomeScreen = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const message = new SpeechSynthesisUtterance(
//       "Hi there! I'm MoodMate. I'm here for you. Let's scan your mood and find something nice to make your day better."
//     );
//     message.rate = 0.9;
//     message.pitch = 1;
//     message.lang = 'en-IN';
//     window.speechSynthesis.speak(message);
//   }, []);

//   return (
//     <div className="welcome-wrapper">
//       <div className="welcome-box">
//         <h1>💙 Welcome to <span>MoodMate</span></h1>
//         <p>Your AI-powered mental wellness companion.</p>
//         <button onClick={() => navigate('/scanner')}>🚀 Start with Mood Scan</button>
//       </div>

//       <div className="feature-section">
//         <h2>✨ What MoodMate Offers</h2>
//         <div className="feature-grid">
//           {features.map((f, i) => (
//             <div key={i} className="feature-card" onClick={() => navigate(f.route)}>
//               <div className="feature-icon">{f.icon}</div>
//               <h3>{f.title}</h3>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <footer className="footer-note">
//         <p>✨ Made with love to help you smile again.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomeScreen;



// src/components/Quotes.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuoteWidget from './QuoteWidget';
import './WelcomeScreen.css';

const features = [
  { icon: "📸", title: "Emotion Scanner", desc: "Scan your mood with camera & AI.", route: "/scanner" },
  { icon: "🤖", title: "AI Friend Chatbot", desc: "I'm your digital buddy—ready to lift your mood, answer your questions, or just be there when you need someone.", route: "/chatbot" },
  { icon: "🎥", title: "Entertainment", desc: "Mood-based movie & music picks.", route: "/entertainment" },
  { icon: "🎵", title: " Music", desc: "Fuel your soul with some tunes—music makes everything better.", route: "/music" },
  { icon: "🧘", title: "Healing Hub", desc: "Guided meditations & self-care tips.", route: "/healinghub" },
  { icon: "🎮", title: "Game Zone", desc: "Fun & relaxing games for your mind.", route: "/gamezone" }
];

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const message = new SpeechSynthesisUtterance(
      "Hi there! I'm MoodMate. I'm here for you. Let's scan your mood and make your day better."
    );
    message.lang = 'en-IN';
    message.rate = 0.9;
    window.speechSynthesis.speak(message);
  }, []);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`welcome-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</button>
      </div>

      <div className="welcome-box fade-in">
        <h1>💙 Welcome to <span>MoodMate</span></h1>
        <p>Your AI-powered wellness companion.</p>
        <button onClick={() => navigate('/scanner')}>🚀 Start with Mood Scan</button>
      </div>

      <div className="feature-section slide-up">
        <h2>✨ What MoodMate Offers</h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card fade-in" onClick={() => navigate(f.route)}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <QuoteWidget />

      <footer className="footer-note fade-in">
        <p>✨ Made with love to help you smile again.</p>
      </footer>

    </div>
  );
};

export default WelcomeScreen;
