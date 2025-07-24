import React, { useState } from 'react';
import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const [orders] = useState([
    { id: 1, customer: 'Alice', status: 'Pending', total: 120 },
    { id: 2, customer: 'Bob', status: 'Completed', total: 300 },
    { id: 3, customer: 'Charlie', status: 'Cancelled', total: 75 },
  ]);

  return (
    <div className={styles.container}>
      <h1>Orders</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.customer}</td>
              <td>
                <span
                  className={`${styles.status} ${styles[order.status.toLowerCase()]}`}
                >
                  {order.status}
                </span>
              </td>
              <td>{order.total}</td>
              <td>
                <button className={styles.viewBtn}>View</button>
                <button className={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
