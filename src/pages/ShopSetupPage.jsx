import React, { useState } from 'react';
import styles from './ShopSetupPage.module.css';

const ShopSetupPage = () => {
  const [shopData, setShopData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({ ...shopData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setShopData({ ...shopData, logo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with an API call to save shop data
    console.log('Shop details submitted:', shopData);
    alert('Shop setup saved successfully!');
  };

  return (
    <div className={styles.container}>
      <h2>Shop Setup</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Shop Name
          <input
            type="text"
            name="name"
            value={shopData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={shopData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={shopData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={shopData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Logo
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </label>

        <button type="submit">Save Shop Info</button>
      </form>

      {shopData.logo && (
        <div className={styles.preview}>
          <h4>Logo Preview:</h4>
          <img
            src={URL.createObjectURL(shopData.logo)}
            alt="Shop Logo"
            className={styles.logo}
          />
        </div>
      )}
    </div>
  );
};

export default ShopSetupPage;
