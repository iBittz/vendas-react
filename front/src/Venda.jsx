import React, { useState } from 'react';
import Input from './Forms/Input';
import { useNavigate } from 'react-router-dom';
import Button from './Forms/Button';
import Option from './Forms/Option';

const Venda = ({ loggedIn }) => {
  const [data, setData] = useState('');
  const [cliente, setCliente] = useState('');
  const [dados, setDados] = React.useState([]);
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [total, setTotal] = useState(0);
  const [venda, setVenda] = useState([]);
  const [vlrTotal, setVlrTotal] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  React.useEffect(() => {
    fetch('http://localhost:3000/cliente', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setDados(json));
  }, []);

  React.useEffect(() => {
    setTotal(valor * quantidade);
  }, [valor, quantidade]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3000/venda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dta_venda: data,
        cod_cliente: Number(cliente),
        val_total_venda: vlrTotal,
        itens: venda,
      }),
    });
    setVenda([]);
  }

  function handleClick(e) {
    e.preventDefault();
    if (produto === '' || valor === 0 || quantidade === 0) {
      alert('Preencha todos os campos!');
      return;
    }
    setVenda([
      ...venda,
      {
        des_produto: produto,
        val_unitario: Number(valor),
        qtd_itens: Number(quantidade),
        val_total: total,
      },
    ]);
    setProduto('');
    setValor(0);
    setQuantidade(0);
  }

  function handleDelete(e) {
    setVenda([]);
  }

  React.useEffect(() => {
    setVlrTotal(vlrTotal + total);
  }, [venda]);

  return (
    <form onSubmit={handleSubmit}>
      {data && cliente ? (
        <div>
          <Button onClick={() => setCliente('')}>Voltar</Button>
          <Input
            name="Produto"
            type="text"
            value={produto}
            onChange={({ target }) => setProduto(target.value)}
          />
          <Input
            name="Valor"
            type="number"
            value={valor}
            onChange={({ target }) => setValor(target.value)}
          />
          <Input
            name="Quantidade"
            type="number"
            value={quantidade}
            onChange={({ target }) => setQuantidade(target.value)}
          />
          <Input name="Total" type="number" value={total} disabled />
          <Button onClick={handleClick}>Adicionar</Button>
          {venda.length >= 1 && <Button type="submit">Finalizar Venda</Button>}
          {venda.length >= 1 && (
            <Button onClick={handleDelete}>Cancelar Venda</Button>
          )}
        </div>
      ) : (
        <div>
          <Input
            name="Selecione uma data"
            type="date"
            value={data}
            onChange={({ target }) => setData(target.value)}
          />
          <Option
            value={cliente}
            onChange={({ target }) => setCliente(target.value)}
            dados={dados}
          />
          {venda.length >= 1 && (
            <Button onClick={handleDelete}>Cancelar Venda</Button>
          )}
        </div>
      )}
      <br></br>
      {venda.length >= 1 && (
        <table style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {venda.map((venda) => (
              <tr key={Math.random() * 10}>
                <td>{venda.des_produto}</td>
                <td>{venda.val_unitario}</td>
                <td>{venda.qtd_itens}</td>
                <td>{venda.val_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </form>
  );
};

export default Venda;
