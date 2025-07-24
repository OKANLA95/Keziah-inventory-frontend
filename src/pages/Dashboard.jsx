import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

import StockSummary from '../components/StockSummary';
import NotificationPanel from '../components/NotificationPanel';
import SalesChart from '../components/SalesChart';
import UserActivityFeed from '../components/UserActivityFeed';

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('/dashboard/overview');
        setOverview(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-4 space-y-6">
      {/* First row: Stock & Notifications */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <StockSummary stocks={overview?.lowStockProducts || []} />
        <NotificationPanel notifications={overview?.notifications || []} />
      </div>

      {/* Second row: Sales Chart */}
      <div>
        <SalesChart sales={overview?.recentOrders || []} />
      </div>

      {/* Third row: User Activity */}
      <div>
        <UserActivityFeed events={overview?.activities || []} />
      </div>
    </div>
  );
}

export default Dashboard;
