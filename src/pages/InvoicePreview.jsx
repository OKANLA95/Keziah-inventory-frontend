import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

const InvoicePage = () => {
  const orderContext = useContext(OrderContext);

  if (!orderContext || !orderContext.orderData) {
    return <p>No order data found. Please create an order first.</p>;
  }

  const {
    customerName,
    orderItems,
    totalAmount,
    invoiceNumber,
    shopInfo,
    createdAt,
  } = orderContext.orderData;

  return (
    <div style={styles.invoice}>
      <h1 style={styles.title}>{shopInfo.name} Invoice</h1>
      <p style={styles.subtitle}>Address: {shopInfo.address}</p>
      <hr />

      <div style={styles.section}>
        <p><strong>Invoice #: </strong>{invoiceNumber}</p>
        <p><strong>Date: </strong>{new Date(createdAt).toLocaleString()}</p>
        <p><strong>Customer: </strong>{customerName}</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Price (GHS)</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.price.toFixed(2)}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
            <td style={{ fontWeight: 'bold' }}>GHS {totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const styles = {
  invoice: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ccc',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '10px',
  },
};

export default InvoicePage;
