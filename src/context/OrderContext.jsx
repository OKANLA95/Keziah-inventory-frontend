import React, { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    orderItems: [],
    invoiceNumber: '',
    orderDate: new Date().toISOString(),
    shopInfo: {
      name: 'Keziah Mart',
      address: 'Damongo, Ghana',
      logo: '',
    },
  });

  // Automatically set invoice number if missing
  useEffect(() => {
    if (!orderData.invoiceNumber) {
      const uniqueNumber = `INV-${Date.now()}`;
      setOrderData(prev => ({
        ...prev,
        invoiceNumber: uniqueNumber,
      }));
    }
  }, [orderData.invoiceNumber]);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
