import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Forms/Button';
import React from 'react';

const ExcluirCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = 'Exclusão de Cliente - ID: ' + id;
  });
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/cliente/${id}`, {
      method: 'DELETE',
    });
    navigate('/cliente/excluir');
  }

  return (
    <center>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Exclusão de Cliente</h1>
        <p>Tem certeza que deseja excluir o cliente {id}?</p>
        <Button type="submit">Excluir</Button>
      </form>
    </center>
  );
};

export default ExcluirCliente;
