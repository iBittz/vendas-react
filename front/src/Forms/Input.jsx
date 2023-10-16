import React from 'react';

const Input = ({ id, name, type, value, onChange, ...props }) => {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {name}
      <input
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
};

export default Input;
