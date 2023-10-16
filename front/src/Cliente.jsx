import React from 'react';
import CadastroCliente from './Cliente/CadastroCliente';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ClienteHeader from './Cliente/ClienteHeader';
import AtualizaCliente from './Cliente/AtualizaCliente';
import ListaClientes from './Cliente/ListaClientes';
import ExcluirCliente from './Cliente/ExcluirCliente';

const Cliente = ({ loggedIn }) => {
  const [des_nome, setNome] = React.useState('');
  const [des_endereco, setEndereco] = React.useState('');
  const [num_endereco, setNumEndereco] = React.useState('');
  const [des_cidade, setCidade] = React.useState('');
  const [des_uf, setEstado] = React.useState('');
  const [des_telefone, setTelefone] = React.useState('');
  const [des_contato, setContato] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  const campos = [
    {
      name: 'Nome',
      campo: 'des_nome',
      value: des_nome,
      onChange: setNome,
    },
    {
      name: 'Endereço',
      campo: 'des_endereco',
      value: des_endereco,
      onChange: setEndereco,
    },
    {
      name: 'Número',
      campo: 'num_endereco',
      value: num_endereco,
      onChange: setNumEndereco,
    },
    {
      name: 'Cidade',
      campo: 'des_cidade',
      value: des_cidade,
      onChange: setCidade,
    },
    {
      name: 'Estado',
      campo: 'des_uf',
      value: des_uf,
      onChange: setEstado,
    },
    {
      name: 'Telefone',
      campo: 'des_telefone',
      value: des_telefone,
      onChange: setTelefone,
    },
    {
      name: 'Contato',
      campo: 'des_contato',
      value: des_contato,
      onChange: setContato,
    },
  ];
  return (
    <>
      <ClienteHeader />
      <Routes>
        <Route
          path="/"
          element={
            <center>
              <h1>Selecione uma opção acima</h1>
            </center>
          }
        />
        <Route path="/cadastro" element={<CadastroCliente campos={campos} />} />
        <Route
          path="/atualizar"
          element={<ListaClientes acao="atualizar" legenda="Atualizar" />}
        />
        <Route
          path="/atualizar/:id"
          element={<AtualizaCliente campos={campos} />}
        />
        <Route
          path="/excluir"
          element={<ListaClientes acao="excluir" legenda="Excluir" />}
        />
        <Route path="/excluir/:id" element={<ExcluirCliente />} />
      </Routes>
    </>
  );
};

export default Cliente;
