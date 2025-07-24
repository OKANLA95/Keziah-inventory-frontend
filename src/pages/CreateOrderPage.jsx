import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import axios from '../api/axiosInstance';

const CreateOrderPage = () => {
  const orderContext = useContext(OrderContext);
  const navigate = useNavigate();

  if (!orderContext) {
    return <p>Error: Order context not found. Make sure OrderProvider wraps this component.</p>;
  }

  const { setOrderData } = orderContext;

  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ name: '', price: '', quantity: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () =>
    setItems([...items, { name: '', price: '', quantity: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const processedItems = items.map((item) => ({
      ...item,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity, 10),
    }));

    const totalAmount = processedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    try {
      const res = await axios.post('/api/orders', {
        customer: customerName,
        products: processedItems,
        totalAmount,
      });

      const createdOrder = res.data.order;

      // Set order data in context for invoice page
      setOrderData({
        customerName,
        orderItems: processedItems,
        totalAmount,
        invoiceNumber: createdOrder._id, // or a custom invoice number
        shopInfo: {
          name: 'Keziah Mart',
          address: 'Damongo, Ghana',
          logo: '',
        },
        createdAt: createdOrder.createdAt,
      });

      navigate('/invoice');
    } catch (err) {
      console.error('❌ Failed to create order:', err);
      setError('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create Order</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
        style={styles.input}
      />

      {items.map((item, index) => (
        <div key={index} style={styles.itemRow}>
          <input
            type="text"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            required
            style={styles.input}
          />
        </div>
      ))}

      <div style={styles.buttonGroup}>
        <button type="button" onClick={addItem} style={styles.buttonSecondary}>
          ➕ Add Item
        </button>
        <button type="submit" disabled={loading} style={styles.buttonPrimary}>
          {loading ? 'Generating Invoice...' : '🧾 Generate Invoice'}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    marginBottom: '1rem',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  itemRow: {
    marginBottom: '1rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
  },
  buttonPrimary: {
    backgroundColor: '#047857',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    backgroundColor: '#f3f4f6',
    color: '#333',
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default CreateOrderPage;