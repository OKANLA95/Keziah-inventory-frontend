// src/components/SalesChart.jsx
'use client';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from '../api/axiosInstance';

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/sales/summary');

        const salesData = Array.isArray(response.data.monthlySales)
          ? response.data.monthlySales
          : Array.isArray(response.data)
          ? response.data
          : [];

        const formatted = salesData.map((item) => {
          const year = item._id?.year;
          const month = String(item._id?.month).padStart(2, '0');
          const totalSales = item.totalSales;

          const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short'
          }).format(new Date(`${year}-${month}-01`));

          return {
            date: formattedDate,
            sales: totalSales
          };
        });

        setData(formatted);
      } catch (err) {
        console.error('❌ Error fetching sales data:', err.message);
        setError('Failed to load sales data.');
        setData([
          { date: 'Jul 2025', sales: 100 },
          { date: 'Aug 2025', sales: 150 },
          { date: 'Sep 2025', sales: 90 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-lg font-bold mb-4">📈 Sales Report</h2>

      {loading ? (
        <p>📊 Loading sales chart...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;
