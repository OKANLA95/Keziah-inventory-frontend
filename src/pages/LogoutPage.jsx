import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '4px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
