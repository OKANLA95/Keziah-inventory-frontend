// src/components/NotificationPanel.jsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/notifications');

        // ✅ Ensure response is always treated as array
        const result = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.notifications)
            ? res.data.notifications
            : [];

        setNotifications(result);
      } catch (error) {
        console.error('❌ Failed to load notifications:', error);
        setError('Failed to load notifications');
        setNotifications([
          { id: 1, message: 'Low stock alert: Tomatoes', date: '2025-07-21' },
          { id: 2, message: 'New user registered', date: '2025-07-20' },
        ]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications found.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((note) => (
            <li key={note.id} className="text-sm border-b pb-2 last:border-b-0">
              <p>{note.message}</p>
              <span className="text-xs text-gray-500">{note.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
