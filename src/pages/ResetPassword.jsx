// pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(`/api/users/reset-password/${token}`, { password });
      setMessage(res.data.message || 'Password reset successfully.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Reset Your Password</h2>

      {message && <p className="mb-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          autoComplete="new-password"
          aria-label="New password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          aria-label="Confirm new password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError('');
          }}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded w-full ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : message
              ? 'bg-green-700 text-white'
              : 'bg-green-600 text-white'
          }`}
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
