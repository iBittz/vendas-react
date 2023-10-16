import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function RelatorioVendaPorCliente({ loggedIn, api }) {
  const [clientes, setClientes] = useState([]);
  const [orderBy, setOrderBy] = useState('dta_ult_pedido_desc'); // default order by dataUltimoPedido_desc
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);
  useEffect(() => {
    async function fetchClientes() {
      const data = await fetch(`${api}/cliente`).then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      });
      setClientes(data);
    }
    fetchClientes();
  }, []);

  // sort the clients array based on the orderBy state
  const sortedClientes = clientes.sort((a, b) => {
    if (orderBy === 'des_nome_asc') {
      return a.des_nome.localeCompare(b.des_nome);
    }
    if (orderBy === 'des_nome_desc') {
      return b.des_nome.localeCompare(a.des_nome);
    }
    if (orderBy === 'val_venda_acumulado_asc') {
      return a.val_venda_acumulado - b.val_venda_acumulado;
    }
    if (orderBy === 'val_venda_acumulado_desc') {
      return b.val_venda_acumulado - a.val_venda_acumulado;
    }
    if (orderBy === 'dta_ult_pedido_asc') {
      return a.dta_ult_pedido.localeCompare(b.dta_ult_pedido);
    }
    if (orderBy === 'dta_ult_pedido_desc') {
      return b.dta_ult_pedido.localeCompare(a.dta_ult_pedido);
    }
  });

  return (
    <center>
      <h1>Relatório de Vendas por Cliente</h1>
      <table
        style={{
          border: '1px solid black',
          width: '100%',
          textAlign: 'center',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                cursor: 'pointer',
                border: '1px solid black',
                padding: '5px',
                userSelect: 'none',
              }}
              onClick={() =>
                orderBy === 'des_nome_asc'
                  ? setOrderBy('des_nome_desc')
                  : setOrderBy('des_nome_asc')
              }
            >
              Nome
            </th>
            <th
              style={{
                cursor: 'pointer',
                border: '1px solid black',
                padding: '5px',
                userSelect: 'none',
              }}
              onClick={() =>
                orderBy === 'val_venda_acumulado_asc'
                  ? setOrderBy('val_venda_acumulado_desc')
                  : setOrderBy('val_venda_acumulado_asc')
              }
            >
              Valor Acumulado de Vendas
            </th>
            <th
              style={{
                cursor: 'pointer',
                border: '1px solid black',
                padding: '5px',
                userSelect: 'none',
              }}
              onClick={() =>
                orderBy === 'dta_ult_pedido_asc'
                  ? setOrderBy('dta_ult_pedido_desc')
                  : setOrderBy('dta_ult_pedido_asc')
              }
            >
              Data do Último Pedido
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClientes.map((cliente) => (
            <tr key={cliente.cod_cliente}>
              <td>{cliente.des_nome}</td>
              <td>{cliente.val_venda_acumulado}</td>
              <td>{format(new Date(cliente.dta_ult_pedido), 'dd-MM-yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
}

export default RelatorioVendaPorCliente;
