import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // ✅ Renamed for clarity
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axiosInstance.post('/users/login', form);

      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      console.log('✅ Login successful');
      navigate('/dashboard');

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login to Your Account</h2>

        {error && <div className={styles.error}>{error}</div>}

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

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className={styles.linkText}>
          Forgot your password?{' '}
          <Link to="/forgot-password" className={styles.link}>
            Reset it here
          </Link>
        </p>

        <p className={styles.linkText}>
          Don’t have an account?{' '}
          <Link to="/register" className={styles.link}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
