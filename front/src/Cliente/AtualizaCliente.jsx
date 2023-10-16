import React from 'react';
import Input from '../Forms/Input';
import { useParams, useNavigate } from 'react-router-dom';
import Titulo from '../Titulo';
import Button from '../Forms/Button';

const AtualizaCliente = ({ campos, api }) => {
  const { id } = useParams();
  const [dados, setDados] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Atualização de Cliente - ID: ' + id;
    fetch(`${api}/cliente/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(setDados);
  }, []);

  React.useEffect(() => {
    if (dados) {
      campos.map((campo) => {
        campo.onChange(dados[campo.campo]);
      });
    }
  }, [dados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${api}/cliente/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        des_nome: campos[0].value,
        des_endereco: campos[1].value,
        num_endereco: campos[2].value,
        des_cidade: campos[3].value,
        des_uf: campos[4].value,
        des_telefone: campos[5].value,
        des_contato: campos[6].value,
      }),
    });
    navigate('/cliente/atualizar');
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Titulo titulo="Atualização de Cliente" />
        {dados &&
          campos.map((campo) => (
            <Input
              key={campo.campo}
              name={campo.name}
              value={campo.value}
              type="text"
              onChange={({ target }) => campo.onChange(target.value)}
            />
          ))}
        <Button
          style={{
            padding: '0.6em',
            fontWeight: 'bold',
            transition: 'all 300ms',
          }}
          type="submit"
        >
          Atualizar
        </Button>
      </form>
    </div>
  );
};

export default AtualizaCliente;
