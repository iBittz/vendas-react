import React from 'react';
import { Link } from 'react-router-dom';

const ListaClientes = ({ acao, legenda, api }) => {
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(`${api}/cliente`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setDados(json));
  }, []);

  return (
    <div>
      <center>
        <h1>Lista de Clientes</h1>
      </center>
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
            <th>{legenda}</th>
            <th>Código</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Número</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Telefone</th>
            <th>Contato</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado) => (
            <tr key={dado.cod_cliente}>
              <td>
                <Link to={`/cliente/${acao}/${dado.cod_cliente}`}>
                  {' ' + legenda + ' '}
                </Link>
              </td>
              <td>{dado.cod_cliente}</td>
              <td>{dado.des_nome}</td>
              <td>{dado.des_endereco}</td>
              <td>{dado.num_endereco}</td>
              <td>{dado.des_cidade}</td>
              <td>{dado.des_uf}</td>
              <td>{dado.des_telefone}</td>
              <td>{dado.des_contato}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaClientes;
