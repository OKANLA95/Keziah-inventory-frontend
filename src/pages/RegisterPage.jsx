import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'owner',
    shopName: '',
    shopAddress: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role, shopName, shopAddress } = form;

    if (!name || !email || !password || !shopName || !shopAddress) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // if your backend uses cookies
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          shop: {
            name: shopName,
            address: shopAddress,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create an Account</h2>

        {error && <div className={styles.error}>{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={form.shopName}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="text"
          name="shopAddress"
          placeholder="Shop Address"
          value={form.shopAddress}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Register</button>

        <p className={styles.linkText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
