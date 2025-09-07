// components/games/MemoryGame.jsx
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const cardsArray = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍑'];
const shuffled = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffled.map(value => ({ value, flipped: false, matched: false })));
  const [prevIndex, setPrevIndex] = useState(null);

  const flipCard = (index) => {
    const newCards = [...cards];
    if (newCards[index].flipped || newCards[index].matched) return;

    newCards[index].flipped = true;
    setCards(newCards);

    if (prevIndex === null) {
      setPrevIndex(index);
    } else {
      const match = newCards[prevIndex].value === newCards[index].value;
      if (match) {
        newCards[prevIndex].matched = true;
        newCards[index].matched = true;
      } else {
        setTimeout(() => {
          newCards[prevIndex].flipped = false;
          newCards[index].flipped = false;
          setCards([...newCards]);
        }, 1000);
      }
      setPrevIndex(null);
    }
  };

  return (
    <div className="memory-container">
      <h2>🧠 Memory Game</h2>
      <div className="memory-grid">
        {cards.map((card, i) => (
          <div key={i} className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`} onClick={() => flipCard(i)}>
            {card.flipped || card.matched ? card.value : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
