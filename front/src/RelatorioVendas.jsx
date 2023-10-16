import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import style from './RelatorioVenda.module.css';
import Input from './Forms/Input';

function RelatorioVendas({ loggedIn, api }) {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [salesData, setSalesData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (salesData) {
      setLoading(false);
    }
  }, [salesData]);

  const fetchSalesData = async () => {
    setLoading(true);
    setSalesData(null);
    let s = startDate.replace(/-/g, '');
    let e = endDate.replace(/-/g, '');
    const vendas = await fetch(`${api}/vendas?start=${s}&end=${e}`);
    const data = await vendas.json();
    await Promise.all(
      data.map(async (venda) => {
        const itens = await fetch(`${api}/itens/${venda.cod_venda}`).then(
          (res) => res.json(),
        );
        const cliente = await fetch(`${api}/cliente/${venda.cod_cliente}`).then(
          (res) => res.json(),
        );
        venda.itens = itens;
        venda.cliente = cliente;
      }),
    );
    return data;
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = fetchSalesData();
    data.then((data) => {
      setSalesData(data);
    });
  }

  return (
    <div>
      <Input
        type="date"
        id="dataInicio"
        name="Data Início"
        value={startDate}
        onChange={handleStartDateChange}
      />

      <Input
        type="date"
        id="dataFinal"
        name="Data Final"
        value={endDate}
        onChange={handleEndDateChange}
      />

      <Input type="submit" value="Buscar" onClick={handleSubmit} />
      <div className={style.container}>
        {loading && <p>Carregando...</p>}
        {!loading &&
          salesData &&
          salesData.map((venda) => {
            return (
              <div key={venda.cod_venda} className={style.item}>
                <h3>Venda {venda.cod_venda}</h3>
                <p>Data: {format(new Date(venda.dta_venda), 'dd-MM-yyyy')}</p>
                <p>Valor Total: R$ {venda.val_total_venda}</p>
                <p>Código do Cliente: {venda.cod_cliente}</p>
                <p>Nome: {venda.cliente.des_nome}</p>
                <p>Cidade: {venda.cliente.des_cidade}</p>
                <p>UF: {venda.cliente.des_uf}</p>
                <p>Telefone: {venda.cliente.des_telefone}</p>
                <p>Itens:</p>
                <table>
                  <thead>
                    <tr>
                      <th>Código do Item</th>
                      <th>Nome do Produto</th>
                      <th>Valor Unitário</th>
                      <th>Quantidade</th>
                      <th>Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venda.itens.map((item) => {
                      return (
                        <tr key={item.cod_item}>
                          <td>{item.cod_item}</td>
                          <td>{item.des_produto}</td>
                          <td>R$ {item.val_unitario}</td>
                          <td>{item.qtd_itens}</td>
                          <td>R$ {item.val_total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RelatorioVendas;
