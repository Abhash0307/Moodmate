// src/components/HealingHub.jsx
import React, { useState, useEffect } from 'react';
import './HealingHub.css';
import bookList from '../data/bookList'; // assume you create this file

const HealingHub = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favBooks")) || [];
  });

  const tags = ['All', 'Motivation', 'Confidence', 'Mindfulness', 'Healing', 'Anxiety', 'Focus'];

  const filteredBooks = selectedTag === 'All'
    ? bookList
    : bookList.filter(book => book.tags.includes(selectedTag));

  const speakSummary = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleFavorite = (book) => {
    let updated = [];
    if (favorites.some(fav => fav.id === book.id)) {
      updated = favorites.filter(fav => fav.id !== book.id);
    } else {
      updated = [...favorites, book];
    }
    setFavorites(updated);
    localStorage.setItem("favBooks", JSON.stringify(updated));
  };

  const isFavorited = (book) => favorites.some(fav => fav.id === book.id);

  return (
    <div className="healinghub-container">
      <h2>📚 Healing & Growth Library</h2>
      <p className="desc">Explore motivational books and healing resources for your emotional well-being.</p>

      <div className="tag-filter">
        <label>🧠 Filter by Topic:</label>
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p className="summary">{book.summary}</p>

            <div className="actions">
              <a href={book.pdf} target="_blank" rel="noreferrer" className="btn">📖 Read</a>
              <button onClick={() => speakSummary(book.summary)} className="btn">🔊 Listen</button>
              <button onClick={() => toggleFavorite(book)} className="btn">
                {isFavorited(book) ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealingHub;
