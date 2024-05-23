// UserIdContext.js
import React, { createContext, useState } from 'react';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const login = (id) => {
    setUserId(id);
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <UserIdContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserIdContext.Provider>
  );
};

export default UserIdContext;
