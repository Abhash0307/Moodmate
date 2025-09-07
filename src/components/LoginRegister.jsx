// // src/components/LoginRegister.jsx
// import React, { useState } from 'react';
// import './LoginRegister.css';
// import { useNavigate } from 'react-router-dom';

// const LoginRegister = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const toggleForm = () => setIsLogin(!isLogin);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const endpoint = isLogin ? "/api/login" : "/api/register";
//     try {
//       const res = await fetch(`http://localhost:8000${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert(data.message);
//         localStorage.setItem("username", username);
//         navigate("/welcomscreen"); // or home/chatbot
//       } else {
//         alert(data.detail || "Login/Register failed.");
//       }
//     } catch (err) {
//       alert("Server error.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-card">
//         <h2>{isLogin ? "Login" : "Register"} to MoodMate</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           required
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">{isLogin ? "Login" : "Register"}</button>

//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : "Already registered?"}
//           <span onClick={toggleForm}>{isLogin ? " Register" : " Login"}</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginRegister;

import React, { useState } from 'react';
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";

    try {
      const res = await fetch(`http://localhost:8000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        localStorage.setItem("username", username);
        navigate("/welcomscreen"); // Update to your landing page
      } else {
        alert(data.detail || "Something went wrong.");
      }
    } catch {
      alert("Server error.");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-box">
        <h2>{isLogin ? "Login" : "Register"} to MoodMate</h2>

        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">{isLogin ? "Login" : "Register"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginRegister;
