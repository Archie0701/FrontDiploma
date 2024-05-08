// Button.js
import React from 'react';

function Button({ onClick }) {
  return (
    <button onClick={onClick}>Send Data</button>
  );
}

export default Button;
