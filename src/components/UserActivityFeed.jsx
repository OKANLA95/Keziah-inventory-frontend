// src/components/UserActivityFeed.jsx

import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const UserActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/dashboard/user-activities');
        setActivities(response.data || []);
      } catch (error) {
        console.error('Error fetching user activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p>Loading user activities...</p>;

  return (
    <div className="user-activity card">
      <h3>🧑‍💼 Recent User Activities</h3>
      <div className="activity-feed" style={{ maxHeight: '250px', overflowY: 'auto' }}>
        {activities.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {activities.map((activity, index) => (
              <li key={index} className="border-b pb-2">
                <span className="font-semibold">{activity.user}</span> {activity.action}
                <div className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserActivityFeed;
