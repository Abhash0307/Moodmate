// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">MoodMate 💙</h2>
//       <ul className="nav-links">
//         <li><Link to="/">Scan Mood</Link></li>
//         <li><Link to="/chatbot">Chatbot</Link></li>
//         <li><Link to="/gamezone">GameZone 🎮</Link></li>
//         <li><Link to="/movies">Movies 🍿</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



// Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h1>MoodMate</h1>
//       <ul className="nav-links">
//         <li><Link to="/">🏠 Home</Link></li>
//         <li><Link to="/scanner">🧠 Scan Mood</Link></li>
//         <li><Link to="/chatbot">💬 Chatbot</Link></li>
//         <li><Link to="/music">🎵 Music</Link></li>
//         <li><Link to="/entertainment">🎬 Movies </Link></li>
//         <li><Link to="/gamezone">🎮 Game Zone</Link></li>
//       </ul>
//     </nav>
//   );
// };



// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="app-navbar">
      <Link to="/welcomscreen">🏠 Home</Link>
      <Link to="/scanner">🧠 Scan</Link>
      <Link to="/chatbot">💬 Chat</Link>
      <Link to="/entertainment">🎬 Movie/Music</Link>
      <Link to="/healinghub">📖 Healing</Link>
      <Link to="/gamezone">🎮 Games</Link>

      <div className="nav-auth">
        {user ? (
          <>
            <span>👤 {user.username}</span>
            <button onClick={handleLogout}>🚪 Logout</button>
          </>
        ) : (
          <Link to="/">🔐 Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


