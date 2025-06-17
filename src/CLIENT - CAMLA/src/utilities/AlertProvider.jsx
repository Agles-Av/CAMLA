import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = 'info') => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }, []);

  const severityStyles = {
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-400 text-black',
    error: 'bg-red-500 text-white',
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <div className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg z-50 transition-all duration-300 ${severityStyles[alert.type]}`}>
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};
