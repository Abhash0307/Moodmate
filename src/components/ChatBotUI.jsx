// import React, { useState, useEffect } from 'react';
// import './ChatbotUI.css';
// import axios from 'axios';
// import { useLocation, Link } from 'react-router-dom';

// const ChatbotUI = () => {
//   const location = useLocation();
//   const emotion = location.state?.emotion || 'neutral';

//   const [userMessage, setUserMessage] = useState('');
//   const [chatLog, setChatLog] = useState([
//     { sender: 'bot', text: `Hi! I noticed you're feeling ${emotion}. I'm here to support you 💙` }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [language, setLanguage] = useState('en'); // Default: English

//   const synth = window.speechSynthesis;

//   // ✅ Translate user message to English before sending to backend
//   const translateToEnglish = async (text) => {
//     if (language === 'en') return text;
//     try {
//       const res = await axios.post('https://libretranslate.com/translate', {
//         q: text,
//         source: language,
//         target: 'en',
//         format: 'text'
//       });
//       return res.data.translatedText;
//     } catch (error) {
//       console.error("Translation to English failed:", error);
//       return text;
//     }
//   };

//   // ✅ Translate bot reply to selected language
//   const translateToUserLang = async (text) => {
//     if (language === 'en') return text;
//     try {
//       const res = await axios.post('https://libretranslate.com/translate', {
//         q: text,
//         source: 'en',
//         target: language,
//         format: 'text'
//       });
//       return res.data.translatedText;
//     } catch (error) {
//       console.error("Translation to user language failed:", error);
//       return text;
//     }
//   };

//   // ✅ Speak message using TTS
//   const speakText = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
//     synth.speak(utterance);
//   };

//   // ✅ Send message to backend
//   const sendMessage = async (msg = userMessage) => {
//     if (!msg.trim()) return;

//     const newLog = [...chatLog, { sender: 'user', text: msg }];
//     setChatLog(newLog);
//     setUserMessage('');
//     setLoading(true);

//     try {
//       const translatedMsg = await translateToEnglish(msg);

//       const res = await fetch("http://localhost:8000/api/chatbot_response", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ emotion, message: translatedMsg })
//       });

//       const data = await res.json();
//       const translatedReply = await translateToUserLang(data.message);

//       setChatLog([...newLog, { sender: 'bot', text: translatedReply }]);
//       speakText(translatedReply);
//     } catch (error) {
//       console.error("Chatbot Error:", error);
//       const fallback = "I'm having trouble responding right now.";
//       setChatLog([...newLog, { sender: 'bot', text: fallback }]);
//       speakText(fallback);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   // ✅ Voice Input
//   const startListening = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("🎤 Voice input is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
//     recognition.interimResults = false;

//     recognition.onstart = () => setIsListening(true);
//     recognition.onresult = (event) => {
//       const spokenText = event.results[0][0].transcript;
//       setIsListening(false);
//       sendMessage(spokenText);
//     };
//     recognition.onerror = (err) => {
//       console.error("Voice error:", err);
//       setIsListening(false);
//     };
//     recognition.onend = () => setIsListening(false);

//     recognition.start();
//   };

//   // ✅ Game suggestion based on emotion (after 6s)
//   useEffect(() => {
//     if (emotion === 'sad' || emotion === 'neutral') {
//       const timer = setTimeout(() => {
//         const suggestion = "Would you like to play a cheerful game to lift your mood?";
//         setChatLog(prev => [...prev, { sender: 'bot', text: suggestion }]);
//         speakText(suggestion);
//       }, 6000);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   return (
//     <div className="chatbot-ui">
//       <h2>MoodMate 🤖</h2>

//       {/* 🌐 Language selector */}
//       <div className="language-select">
//         <label>🌐 Language:</label>
//         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//           <option value="en">English</option>
//           <option value="hi">हिंदी</option>
//           <option value="ta">தமிழ்</option>
//           <option value="bn">বাংলা</option>
//           <option value="gu">ગુજરાતી</option>
//           <option value="ml">മലയാളം</option>
//         </select>
//       </div>

//       {/* 💬 Chat log */}
//       <div className="chat-window">
//         {chatLog.map((msg, idx) => (
//           <div key={idx} className={`chat-message ${msg.sender}`}>
//             <span>{msg.text}</span>
//           </div>
//         ))}
//         {loading && <div className="chat-message bot">Typing...</div>}
//       </div>

//       {/* ✍️ Input and Mic */}
//       <div className="chat-input">
//         <input
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Say or type something..."
//         />
//         <button onClick={sendMessage}>Send</button>
//         <button onClick={startListening}>
//           🎤 {isListening ? "Listening..." : "Speak"}
//         </button>
//       </div>

//       {/* 🎮 Game suggestion button */}
//       {chatLog.some(log => log.text.includes("cheerful game")) && (
//         <div className="game-suggestion">
//           <Link to="/gamezone" className="play-btn">🎮 Yes, let’s play!</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotUI;


import React, { useState, useEffect } from 'react';
import './ChatbotUI.css';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const ChatbotUI = () => {
  const location = useLocation();
  const emotion = location.state?.emotion || 'neutral';

  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: `💬 Hi, I'm MoodMate 🤖 — your friendly AI companion. I noticed you're feeling ${emotion}. Let’s talk!` }
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');

  const synth = window.speechSynthesis;

  const translateToEnglish = async (text) => {
    if (language === 'en') return text;
    try {
      const res = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: language,
        target: 'en',
        format: 'text'
      });
      return res.data.translatedText;
    } catch {
      return text;
    }
  };

  const translateToUserLang = async (text) => {
    if (language === 'en') return text;
    try {
      const res = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: 'en',
        target: language,
        format: 'text'
      });
      return res.data.translatedText;
    } catch {
      return text;
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    synth.speak(utterance);
  };

  const sendMessage = async (msg = userMessage) => {
    if (!msg.trim()) return;

    const newLog = [...chatLog, { sender: 'user', text: msg }];
    setChatLog(newLog);
    setUserMessage('');
    setLoading(true);

    try {
      const translatedMsg = await translateToEnglish(msg);
      const res = await fetch("http://localhost:8000/api/chatbot_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion, message: translatedMsg })
      });

      const data = await res.json();
      const reply = await translateToUserLang(data.message);
      setChatLog([...newLog, { sender: 'bot', text: reply }]);
      speakText(reply);
    } catch {
      const fallback = "Hmm... something went wrong. Try again soon!";
      setChatLog([...newLog, { sender: 'bot', text: fallback }]);
      speakText(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("🎤 Voice input not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setIsListening(false);
      sendMessage(spokenText);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  useEffect(() => {
    if (emotion === 'sad' || emotion === 'neutral') {
      const timer = setTimeout(() => {
        const suggestion = "Would you like to play a cheerful game to lift your mood?";
        setChatLog(prev => [...prev, { sender: 'bot', text: suggestion }]);
        speakText(suggestion);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="chatbot-ui">
      <div className="chat-header">
        🤖 Meet <span>MoodMate</span>
        <p>AI friend that listens, supports and cheers you up 💙</p>
      </div>

      <div className="language-select">
        <label>🌐 Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ta">தமிழ்</option>
          <option value="bn">বাংলা</option>
          <option value="gu">ગુજરાતી</option>
          <option value="ml">മലയാളം</option>
        </select>
      </div>

      <div className="chat-window">
        {chatLog.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        {loading && <div className="chat-message bot"><div className="typing">Typing...</div></div>}
      </div>

      <div className="chat-input">
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={startListening}>
          🎤 {isListening ? "Listening..." : "Speak"}
        </button>
      </div>

      {chatLog.some(log => log.text.includes("cheerful game")) && (
        <div className="game-suggestion">
          <Link to="/gamezone" className="play-btn">🎮 Yes, let’s play!</Link>
        </div>
      )}
    </div>
  );
};

export default ChatbotUI;

