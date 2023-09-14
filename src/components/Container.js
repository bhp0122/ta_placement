import React from 'react';

const Container = ({ children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {children}
    </div>
  );
};

export default Container;
