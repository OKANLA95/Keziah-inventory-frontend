import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Keziah Inventory</h1>
        <div className="nav-container">
          <nav className="main-nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/products">Products</Link>
            <Link to="/create-order">Create Order</Link>
            <Link to="/shop-setup">Shop Setup</Link>
            <Link to="/users">Users</Link>
            <Link to="/search">Search</Link>
          </nav>
          <nav className="logout-nav">
            <Link to="/logout">Logout</Link>
          </nav>
        </div>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
