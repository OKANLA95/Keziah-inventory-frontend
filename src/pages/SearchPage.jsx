// src/pages/SearchPage.jsx
import React, { useState } from 'react';

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
    <>
      <style>
        {`
          .search-page {
            padding: 2rem;
            max-width: 800px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          }

          .search-page h2 {
            color: #0072ff;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .search-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 1rem;
            margin-bottom: 1.5rem;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 114, 255, 0.1);
          }

          .search-input:focus {
            border-color: #0072ff;
            box-shadow: 0 0 8px rgba(0, 114, 255, 0.3);
          }

          .results {
            display: grid;
            gap: 1rem;
          }

          .result-card {
            background: #f4f9fb;
            padding: 1rem;
            border-left: 5px solid #0072ff;
            border-radius: 8px;
            transition: transform 0.2s ease;
          }

          .result-card:hover {
            transform: translateX(5px);
            background-color: #eaf5ff;
          }

          .no-results {
            color: #999;
            text-align: center;
          }
        `}
      </style>

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
    </>
  );
}

export default SearchPage;
