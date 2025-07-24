'use client';

import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance'; // Confirm this path matches your structure

const StockSummary = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get('/stock/summary'); // Adjust if needed
        setData(response.data || []);
      } catch (err) {
        console.error('❌ Error fetching stock summary:', err.message);
        setError('Failed to load stock summary.');
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <section className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-lg font-bold mb-4">📦 Stock Summary</h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading stock data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No stock data available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <li
              key={index}
              className="flex justify-between py-2 text-sm sm:text-base"
            >
              <span className="font-medium text-gray-700">{item?.name || 'Unnamed Item'}</span>
              <span className="text-gray-600">{item?.quantity ?? 0}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default StockSummary;
