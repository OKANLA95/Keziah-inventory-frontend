import React, { useState } from 'react';
import styles from './AdminUsersPage.module.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Daniel Yakubu', email: 'daniel@example.com', role: 'Admin' },
    { id: 2, name: 'Esther K.', email: 'esther@example.com', role: 'Sales' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role) return;

    const user = {
      id: Date.now(),
      ...newUser,
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: '' });
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2>Manage Team Users</h2>

      <form onSubmit={addUser} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <select name="role" value={newUser.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Sales">Sales</option>
          <option value="Manager">Manager</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userCard}>
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
              <small>{user.role}</small>
            </div>
            <button onClick={() => deleteUser(user.id)} className={styles.deleteBtn}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
