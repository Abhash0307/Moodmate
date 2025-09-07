
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './MovieMusicRecommendation.css';

// // 🎯 Step 1: Define mood → genre mapping
// const moodToGenre = {
//   happy: "comedy",
//   sad: "drama",
//   angry: "action",
//   love: "romance",
//   neutral: "family",
//   surprised: "thriller",
//   bored: "adventure"
// };

// const genres = ["comedy", "romance", "drama", "sci-fi", "thriller", "action"];
// const languages = [
//   { code: "en", label: "English" },
//   { code: "hi-IN", label: "Hindi" },
//   { code: "ta-IN", label: "Tamil" }
// ];

// const MovieMusicRecommendation = () => {
//   const location = useLocation();
//   const mood = (location.state?.emotion || "neutral").toLowerCase();

//   const [genre, setGenre] = useState(moodToGenre[mood] || "comedy");  // ✅ Step 2: set from mood
//   const [language, setLanguage] = useState("hi-IN");
//   const [movies, setMovies] = useState([]);
//   const [playlists, setPlaylists] = useState([]);

//   useEffect(() => {
//     // 🎬 Fetch TMDB movies
//     fetch(`http://localhost:8000/api/movies?genre=${genre}&language=${language}`)
//       .then(res => res.json())
//       .then(data => setMovies(Array.isArray(data) ? data : []))
//       .catch(err => {
//         console.error("Movie fetch error:", err);
//         setMovies([]);
//       });

//     // 🎵 Fetch Spotify playlists
//     fetch(`http://localhost:8000/api/music?emotion=${mood}&genre=${genre}`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) {
//           const safePlaylists = data.filter(p =>
//             p &&
//             typeof p === 'object' &&
//             p.external_urls &&
//             p.external_urls.spotify &&
//             p.name
//           );
//           setPlaylists(safePlaylists);
//         } else {
//           setPlaylists([]);
//         }
//       })
//       .catch(err => {
//         console.error("Music fetch error:", err);
//         setPlaylists([]);
//       });
//   }, [genre, language, mood]);

//   return (
//     <div className="recommendation-container">
//       <h2>🎬 & 🎵 Recommendations for your mood: <strong>{mood}</strong></h2>

//       <div className="filters">
//         <select value={genre} onChange={e => setGenre(e.target.value)}>
//           {genres.map(g => <option key={g} value={g}>{g}</option>)}
//         </select>
//         <select value={language} onChange={e => setLanguage(e.target.value)}>
//           {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
//         </select>
//       </div>

//       <div className="section">
//   <h3>🎬 Movie Recommendations</h3>
//   <div className="movie-grid">
//     {Array.isArray(movies) && movies.length > 0 ? (
//       movies.map((movie) => (
//         <div key={movie.id} className="movie-card">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//             className="movie-poster"
//           />
//           <div className="movie-details">
//             <h4>{movie.title}</h4>
//             <p className="movie-overview">{movie.overview?.slice(0, 100)}...</p>
//             <a
//               href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`}
//               target="_blank"
//               rel="noreferrer"
//               className="trailer-button"
//             >
//               ▶ Watch Trailer
//             </a>
//           </div>
//         </div>
//       ))
//     ) : (
//       <p>No movies found.</p>
//     )}
//   </div>
// </div>
  



//       <div className="section">
//         <h3>🎵 Spotify Playlists</h3>
//         <ul>
//           {playlists.length > 0 ? (
//             playlists.map((playlist) => (
//               <li key={playlist.id}>
//                 <a href={playlist.external_urls.spotify} target="_blank" rel="noreferrer">
//                   {playlist.name}
//                 </a>
//               </li>
//             ))
//           ) : (
//             <li>No music found. Try another mood or genre.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MovieMusicRecommendation;
  

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieMusicRecommendation.css';

// 🎯 Mood → Genre map
const moodToGenre = {
  happy: "comedy",
  sad: "drama",
  angry: "action",
  love: "romance",
  neutral: "family",
  surprised: "thriller",
  bored: "adventure"
};

const genres = ["comedy", "romance", "drama", "sci-fi", "thriller", "action"];
const languages = [
  { code: "en", label: "English" },
  { code: "hi-IN", label: "Hindi" },
  { code: "ta-IN", label: "Tamil" }
];

const MovieMusicRecommendation = () => {
  const location = useLocation();
  const mood = (location.state?.emotion || "neutral").toLowerCase();

  const [genre, setGenre] = useState(moodToGenre[mood] || "comedy");
  const [language, setLanguage] = useState("hi-IN");
  const [movies, setMovies] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // 🎬 Get movies from TMDB + providers
    fetch(`http://localhost:8000/api/movies?genre=${genre}&language=${language}`)
      .then(res => res.json())
      .then(data => setMovies(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Movie fetch error:", err);
        setMovies([]);
      });

    // 🎵 Fetch Spotify playlists
    fetch(`http://localhost:8000/api/music?emotion=${mood}&genre=${genre}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const safePlaylists = data.filter(p =>
            p &&
            typeof p === 'object' &&
            p.external_urls &&
            p.external_urls.spotify &&
            p.name
          );
          setPlaylists(safePlaylists);
        } else {
          setPlaylists([]);
        }
      })
      .catch(err => {
        console.error("Music fetch error:", err);
        setPlaylists([]);
      });
  }, [genre, language, mood]);

  return (
    <div className="recommendation-container">
      <h2>🎬 & 🎵 Recommendations for your mood: <strong>{mood}</strong></h2>

      {/* Filters */}
      <div className="filters">
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </div>

    
      <div className="section">
        <h3>🎬 Movie Recommendations</h3>
        <div className="movie-grid">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <h4>{movie.title}</h4>
                  <p className="movie-overview">{movie.overview?.slice(0, 100)}...</p>

                  <div className="button-row">
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="trailer-button"
                    >
                      ▶ Trailer
                    </a>
                    {movie.watch_link ? (
                      <a
                        href={movie.watch_link}
                        target="_blank"
                        rel="noreferrer"
                        className="watch-button"
                      >
                        🎬 Watch Now
                      </a>
                    ) : (
                      <span className="no-watch">❌ Not Available</span>
                    )}
                  </div>

                  {/* Provider Logos */}
                  <div className="providers">
                    {movie.providers?.map(p => (
                      <img
                        key={p.provider_name}
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        title={p.provider_name}
                        className="provider-logo"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>

      {/* Spotify Playlists Section */}
      <div className="section">
        <h3>🎵 Spotify Playlists</h3>
        <ul>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <li key={playlist.id}>
                <a href={playlist.external_urls.spotify} target="_blank" rel="noreferrer">
                  {playlist.name}
                </a>
              </li>
            ))
          ) : (
            <li>No music found. Try another mood or genre.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MovieMusicRecommendation;

