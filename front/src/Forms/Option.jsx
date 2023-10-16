import React from 'react';

const Option = ({ onChange, value, dados, ...props }) => {
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
      <select
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
        {...props}
        value={value}
        onChange={onChange}
      >
        <option value="">--Selecione um cliente--</option>

        {dados.map((dado) => (
          <option key={dado.cod_cliente} value={dado.cod_cliente}>
            {dado.des_nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Option;
