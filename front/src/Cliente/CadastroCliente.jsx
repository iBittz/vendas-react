import React from 'react';
import Input from '../Forms/Input';
import Titulo from '../Titulo';
import Button from '../Forms/Button';

const CadastroCliente = ({ campos }) => {
  const [mensagem, setMensagem] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (campos[0].value === '') {
      alert('Preencha o campo nome!');
      return;
    } else if (campos[1].value === '') {
      alert('Preencha o campo endereço!');
      return;
    } else if (campos[2].value === '') {
      alert('Preencha o campo número!');
      return;
    } else if (campos[3].value === '') {
      alert('Preencha o campo cidade!');
      return;
    } else if (campos[4].value === '') {
      alert('Preencha o campo UF!');
      return;
    } else if (campos[5].value === '') {
      alert('Preencha o campo telefone!');
      return;
    } else if (campos[6].value === '') {
      alert('Preencha o campo contato!');
      return;
    } else {
      fetch('http://localhost:3000/cliente', {
        method: 'POST',
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
      alert('Cadastrado com sucesso!');
      setMensagem('Cadastrado com sucesso!');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Titulo titulo="Cadastro de Clientes" />
        {campos.map((campo) => (
          <Input
            key={campo.name}
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
          Cadastrar
        </Button>
        {mensagem && (
          <p
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: '1.2em',
              textAlign: 'center',
            }}
          >
            {mensagem}
          </p>
        )}
      </form>
    </div>
  );
};

export default CadastroCliente;
