




// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import './MusicRecommendation.css';

// const SongRecommendation = () => {
//   const location = useLocation();
//   const emotion = location.state?.emotion || "neutral";
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:8000/api/music?emotion=${emotion}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const safe = Array.isArray(data) ? data : [];
//         setSongs(safe);
//       })
//       .catch((err) => {
//         console.error("Music fetch error:", err);
//         setSongs([]);
//       });
//   }, [emotion]);

//   return (
//     <div className="song-container">
//       <h2>🎶 Songs for your mood: {emotion}</h2>
//       <div className="song-grid">
//         {songs.length > 0 ? songs.map(song => (
//           <div key={song.id} className="song-card">
//             <img
//               src={song.image || "https://via.placeholder.com/300x300?text=No+Image"}
//               alt={song.name}
//               className="song-img"
//             />
//             <h4>{song.name}</h4>
//             <a href={song.link} target="_blank" rel="noreferrer">
//               ▶ Listen on Spotify
//             </a>
//           </div>
//         )) : <p>No playlists found for this mood.</p>}
//       </div>
//     </div>
//   );
// };

// export default SongRecommendation;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './MusicRecommendation.css';

const MusicRecommendation = () => {
  const location = useLocation();
  const emotion = location.state?.emotion || "neutral";
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/music?emotion=${emotion}`)
      .then((res) => res.json())
      .then((data) => {
        const safe = Array.isArray(data) ? data : [];
        setSongs(safe);
        speak(`Here are some ${emotion} songs from Spotify to brighten your mood.`);
      })
      .catch((err) => {
        console.error("Music fetch error:", err);
        setSongs([]);
        speak("Sorry, I couldn't find songs for your mood right now.");
      });
  }, [emotion]);

  // ✅ Text-to-Speech Function
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";           // Indian English
    msg.rate = 0.95;              // Moderate pace
    msg.pitch = 1.2;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="song-container">
      <h2>🎶 Songs for your mood: {emotion}</h2>
      <div className="song-grid">
        {songs.length > 0 ? (
          songs.map(song => (
            <div key={song.id} className="song-card">
              <img
                src={song.image || "https://via.placeholder.com/300x300?text=No+Image"}
                alt={song.name}
                className="song-img"
              />
              <h4>{song.name}</h4>
              <a href={song.link} target="_blank" rel="noreferrer">
                ▶ Listen on Spotify
              </a>
            </div>
          ))
        ) : (
          <p>No playlists found for this mood.</p>
        )}
      </div>
    </div>
  );
};

export default MusicRecommendation;


