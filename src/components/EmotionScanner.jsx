// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";
// import "./EmotionScanner.css";

// const EmotionScanner = () => {
//   const webcamRef = useRef(null);
//   const [emotion, setEmotion] = useState("Not Detected");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const videoConstraints = {
//     width: 320,
//     height: 320,
//     facingMode: "user",
//   };

//   const handleScan = async () => {
//     const image = webcamRef.current.getScreenshot();
//     if (!image) return;

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8000/api/detect_emotion", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image }),
//       });

//       const data = await res.json();
//       const mood = data.emotion;
//       setEmotion(mood);
//       speakMood(mood);
//       setTimeout(() => navigate("/chat", { state: { emotion: mood } }), 6000);
//     } catch (err) {
//       console.error("Error:", err);
//       setEmotion("Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const speakMood = (mood) => {
//     const msg = new SpeechSynthesisUtterance(`You're feeling ${mood}. I'm here for you.`);
//     msg.lang = "en-IN";
//     msg.rate = 0.9;
//     window.speechSynthesis.speak(msg);
//   };

//   return (
//     <div className="scanner-app">
//       <div className="scanner-card">
//         <h2>MoodMate 🧠</h2>

//         <div className="camera-circle">
//           <Webcam
//             ref={webcamRef}
//             audio={false}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             className="webcam-circle"
//           />
//         </div>

//         <button onClick={handleScan} className="glow-button">
//           📷 Scan My Mood
//         </button>

//         {loading && <div className="loader-text">Scanning face...</div>}

//         <div className="chat-bubble">
//           {getEmoji(emotion)} <span>{emotion}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getEmoji = (emotion) => {
//   const mood = emotion.toLowerCase();
//   if (mood.includes("happy")) return "😊";
//   if (mood.includes("sad")) return "😢";
//   if (mood.includes("neutral")) return "😐";
//   if (mood.includes("angry")) return "😠";
//   if (mood.includes("surprise")) return "😲";
//   if (mood.includes("love")) return "❤️";
//   return "🤔";
// };

// export default EmotionScanner;





// EmotionScanner.jsx
// import React, { useState, useRef } from 'react';
// import Webcam from "react-webcam";
// import { useNavigate } from 'react-router-dom';
// import './EmotionScanner.css';

// const EmotionScanner = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [emotion, setEmotion] = useState("Not Detected");
//   const [showOptions, setShowOptions] = useState(false);
//   const navigate = useNavigate();

//   const videoConstraints = {
//     width: 400,
//     height: 300,
//     facingMode: "user"
//   };

//   const capture = async () => {
//     const screenshot = webcamRef.current.getScreenshot();
//     setImageSrc(screenshot);

//     try {
//       const res = await fetch("http://localhost:8000/api/detect_emotion", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: screenshot })
//       });

//       const data = await res.json();
//       setEmotion(data.emotion);
//       speakAndSuggest(data.emotion);
//     } catch (error) {
//       console.error("Emotion detection failed:", error);
//       setEmotion("Detection Failed");
//     }
//   };

//   const speakAndSuggest = (detectedEmotion) => {
//     const text = `You're feeling ${detectedEmotion}. Would you like to talk to me, watch a movie, or listen to music?`;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = 'en-IN';
//     window.speechSynthesis.speak(utter);
//     setShowOptions(true);
//   };

//   return (
//    <div className="scanner-app">
//       <div className="scanner-card">
//         <h2>MoodMate 🧠</h2>

//         <div className="camera-circle">
//           <Webcam
//             ref={webcamRef}
//             audio={false}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             className="webcam-circle"
//         />
//         </div>


//         <button onClick={capture} className="glow-button">
//           📷 Scan My Mood
//         </button>

//         <h3>Your Emotion: {emotion}</h3>

//         {showOptions && (
//           <div className="emotion-options">
//             <p>What would you like to do now?</p>
//             <button onClick={() => navigate("/chatbot", { state: { emotion } })}>
//               💬 Talk to AI
//             </button>
//             <button onClick={() => navigate("/entertainment", { state: { emotion } })}>
//               🎬 Watch Movie / 🎵 Listen to Music
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// const getEmoji = (emotion) => {
//   const mood = emotion.toLowerCase();
//   if (mood.includes("happy")) return "😊";
//   if (mood.includes("sad")) return "😢";
//   if (mood.includes("neutral")) return "😐";
//   if (mood.includes("angry")) return "😠";
//   if (mood.includes("surprise")) return "😲";
//   if (mood.includes("love")) return "❤️";
//   return "🤔";
// };
// export default EmotionScanner;




// import React, { useState, useRef } from 'react';
// import Webcam from "react-webcam";
// import { useNavigate } from 'react-router-dom';
// import './EmotionScanner.css';

// const EmotionScanner = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [emotion, setEmotion] = useState("Not Detected");
//   const [showOptions, setShowOptions] = useState(false);
//   const navigate = useNavigate();
  

//   const videoConstraints = {
//     width: 400,
//     height: 300,
//     facingMode: "user"
//   };

//   const capture = async () => {
//     const screenshot = webcamRef.current.getScreenshot();
//     setImageSrc(screenshot);

//     try {
//       const res = await fetch("http://localhost:8000/api/detect_emotion", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: screenshot })
//       });

//       const data = await res.json();
//       const mood = data.emotion.toLowerCase(); // lowercase to avoid mismatch
//       setEmotion(mood);
//       speakAndSuggest(mood);
//     } catch (error) {
//       console.error("Emotion detection failed:", error);
//       setEmotion("Detection Failed");
//     }
//   };

//   const speakAndSuggest = (mood) => {
//     const text = `You're feeling ${mood}. Would you like to talk to me, watch a movie, or listen to music?`;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = 'en-IN';
//     window.speechSynthesis.speak(utter);
//     setShowOptions(true);
//   };

//   return (
//     <div className="scanner-app">
//       <div className="scanner-card">
//         <h2>MoodMate 🧠</h2>

//         <div className="camera-circle">
//           <Webcam
//             ref={webcamRef}
//             audio={false}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             className="webcam-circle"
//           />
//         </div>

//         <button onClick={capture} className="glow-button">
//           📷 Scan My Mood
//         </button>
        

//         <h3>Your Emotion: {emotion}</h3>

//         {showOptions && (
//           <div className="emotion-options">
//             <p>What would you like to do now?</p>
//             <button onClick={() => navigate("/chatbot", { state: { emotion } })}>
//               💬 Talk to AI
//             </button>
//             <button onClick={() => navigate("/entertainment", { state: { emotion } })}>
//               🎬 Watch Movie 
//             </button>
//                 <button onClick={() => navigate("/music", { state: { emotion } })}>
//       🎵 Listen to Music
//     </button>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmotionScanner;






import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
import './EmotionScanner.css';

const EmotionScanner = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [emotion, setEmotion] = useState("Not Detected");
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"
  };

  const capture = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImageSrc(screenshot);

    try {
      setLoading(true);  // ✅ Show loading while scanning
      const res = await fetch("http://localhost:8000/api/detect_emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: screenshot })
      });

      const data = await res.json();
      const mood = data.emotion.toLowerCase();
      setEmotion(mood);
      speakAndSuggest(mood);
    } catch (error) {
      console.error("Emotion detection failed:", error);
      setEmotion("Detection Failed");
    } finally {
      setLoading(false);  // ✅ Hide loading after response
    }
  };

  const speakAndSuggest = (mood) => {
    const text = `You're feeling ${mood}. Would you like to talk to me, watch a movie, or listen to music?`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-IN';
    window.speechSynthesis.speak(utter);
    setShowOptions(true);
  };

  return (
    <div className="scanner-app">
      <div className="scanner-card">
        <h2>MoodMate 🧠</h2>

        <div className="camera-circle">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam-circle"
          />
        </div>

        <button onClick={capture} className="glow-button">
          📷 Scan My Mood
        </button>

        {loading && <p style={{ color: "#007acc", fontWeight: "bold" }}>🔍 Scanning your mood...</p>}

        <h3>Your Emotion: {emotion}</h3>

        {showOptions && (
          <div className="emotion-options">
            <p>What would you like to do now?</p>
            <button onClick={() => navigate("/chatbot", { state: { emotion } })}>
              💬 Talk to AI
            </button>
            <button onClick={() => navigate("/entertainment", { state: { emotion } })}>
              🎬 Watch Movie
            </button>
            <button onClick={() => navigate("/music", { state: { emotion } })}>
              🎵 Listen to Music
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionScanner;
