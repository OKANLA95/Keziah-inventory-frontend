// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import './search.css'; // We'll create this file next

const sampleData = [
  { id: 1, name: 'Tomatoes', category: 'Vegetables' },
  { id: 2, name: 'Bananas', category: 'Fruits' },
  { id: 3, name: 'Carrots', category: 'Vegetables' },
  { id: 4, name: 'Apples', category: 'Fruits' },
];

function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredData = sampleData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <h2>Search Inventory</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="results">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="result-card" key={item.id}>
              <h4>{item.name}</h4>
              <p>Category: {item.category}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
