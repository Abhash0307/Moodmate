// components/games/QuizGame.jsx
import React, { useState, useEffect } from 'react';
import './QuizGame.css';

const QuizGame = () => {
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map(q => ({
          question: q.question,
          correct: q.correct_answer,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }));
        setQuestions(formatted);
      });
  }, []);

  const handleAnswer = (ans) => {
    if (ans === questions[idx].correct) setScore(prev => prev + 1);
    setIdx(prev => prev + 1);
  };

  if (!questions.length) return <p>Loading...</p>;
  if (idx >= questions.length) return <h3>Your Score: {score}/{questions.length}</h3>;

  return (
    <div className="quiz-container">
      <h2>{questions[idx].question}</h2>
      {questions[idx].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
      ))}
    </div>
  );
};

export default QuizGame;
