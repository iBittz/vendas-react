import React from 'react';

const Button = ({ onClick, children, ...props }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
