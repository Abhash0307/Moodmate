// // src/components/QuoteWidget.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './QuoteWidget.css';

// const QuoteWidget = () => {
//   const [quotes, setQuotes] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [favorites, setFavorites] = useState([]);

//   // Fetch quotes from ZenQuotes
//   useEffect(() => {
//     axios.get("https://zenquotes.io/api/quotes")
//       .then(res => {
//         setQuotes(res.data.slice(0, 5)); // Limit to 5 quotes for carousel
//       })
//       .catch(err => console.error("Quote fetch failed:", err));
//   }, []);

//   // Load favorites from localStorage
//   useEffect(() => {
//     const favs = JSON.parse(localStorage.getItem("quoteFavorites")) || [];
//     setFavorites(favs);
//   }, []);

//   // Save to localStorage
//   const toggleFavorite = (quote) => {
//     const isFav = favorites.find(fav => fav.q === quote.q && fav.a === quote.a);
//     const updated = isFav
//       ? favorites.filter(fav => fav.q !== quote.q)
//       : [...favorites, quote];

//     setFavorites(updated);
//     localStorage.setItem("quoteFavorites", JSON.stringify(updated));
//   };

//   const speak = (text) => {
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-IN";
//     utter.rate = 1;
//     window.speechSynthesis.speak(utter);
//   };

//   const nextQuote = () => {
//     setCurrentIndex((currentIndex + 1) % quotes.length);
//   };

//   const prevQuote = () => {
//     setCurrentIndex((currentIndex - 1 + quotes.length) % quotes.length);
//   };

//   const currentQuote = quotes[currentIndex];

//   return (
//     <div className="quote-widget">
//       <h3>💬 Quote of the Day</h3>

//       {currentQuote ? (
//         <>
//           <p className="quote-text">“{currentQuote.q}”</p>
//           <p className="quote-author">- {currentQuote.a}</p>

//           <div className="quote-actions">
//             <button onClick={prevQuote}>⬅️</button>
//             <button onClick={() => speak(currentQuote.q)}>🔊 Speak</button>
//             <button onClick={() => toggleFavorite(currentQuote)}>
//               {favorites.find(fav => fav.q === currentQuote.q) ? "❤️" : "🤍"}
//             </button>
//             <button onClick={nextQuote}>➡️</button>
//           </div>
//         </>
//       ) : (
//         <p>Loading quote...</p>
//       )}
//     </div>
//   );
// };

// export default QuoteWidget;



// src/components/QuoteCarousel.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./QuoteWidget.css";

// const QuoteCarousel = () => {
//   const [quotes, setQuotes] = useState([]);
//   const [index, setIndex] = useState(0);

//   // Fetch quotes from ZenQuotes
//   useEffect(() => {
//     axios.get("https://zenquotes.io/api/quotes")
//       .then((res) => {
//         setQuotes(res.data.slice(0, 10)); // show 10 random quotes
//         speakQuote(res.data[0]?.q);
//       })
//       .catch((err) => console.error("Quotes fetch error:", err));
//   }, []);

//   // Change quote every 10s
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const nextIndex = (index + 1) % quotes.length;
//       setIndex(nextIndex);
//       speakQuote(quotes[nextIndex]?.q);
//     }, 10000);
//     return () => clearInterval(timer);
//   }, [index, quotes]);

//   const speakQuote = (text) => {
//     if (!text) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-IN";
//     utter.rate = 1;
//     window.speechSynthesis.speak(utter);
//   };

//   const currentQuote = quotes[index];

//   return (
//     <div className="quote-carousel">
//       <h3>✨ Quote of the Moment</h3>
//       {currentQuote ? (
//         <>
//           <p className="quote-text">“{currentQuote.q}”</p>
//           <p className="quote-author">- {currentQuote.a}</p>
//         </>
//       ) : (
//         <p>Loading inspiration...</p>
//       )}
//     </div>
//   );
// };

// export default QuoteCarousel;

import React, { useEffect, useState } from "react";
import "./QuoteWidget.css";

const fallbackQuotes = [
  { q: "Believe in yourself and all that you are.", a: "Christian D. Larson" },
  { q: "Difficult roads often lead to beautiful destinations.", a: "Zig Ziglar" },
  { q: "You are stronger than you think.", a: "Unknown" },
  { q: "The struggle you’re in today is developing the strength you need for tomorrow.", a: "Robert Tew" },
  { q: "Start where you are. Use what you have. Do what you can.", a: "Arthur Ashe" },
];

const QuoteCarousel = () => {
  const [quotes, setQuotes] = useState(fallbackQuotes);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Optional: Try loading from ZenQuotes if needed
    fetch("https://zenquotes.io/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].q) {
          setQuotes(data.slice(0, 500));
        //   speakQuote(data[0].q);
        }
      })
      .catch((err) => {
        console.warn("ZenQuotes failed, using fallback quotes");
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % quotes.length;
      setIndex(next);
    //   speakQuote(quotes[next]?.q);
    }, 10000);

    return () => clearInterval(timer);
  }, [index, quotes]);

//   const speakQuote = (text) => {
//     if (!text) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-IN";
//     utter.rate = 1;
//     window.speechSynthesis.speak(utter);
//   };

  const current = quotes[index];

  return (
    <div className="quote-carousel">
      <h3>✨ Quote of the Moment</h3>
      {current ? (
        <>
          <p className="quote-text">“{current.q}”</p>
          <p className="quote-author">- {current.a}</p>
        </>
      ) : (
        <p>Loading inspiration...</p>
      )}
    </div>
  );
};

export default QuoteCarousel;
