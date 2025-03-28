import React from 'react';
import './NeophyteLoader.css';

const NeophyteLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <img 
        className="logo" 
        src="/images/neophyte_logo.0f7585f90d05ab5ce307(1).png" 
        alt="Neophyte Logo" 
      />
    </div>
  );
};

export default NeophyteLoader;