import React from 'react';
import { Link } from 'react-router-dom';
import style from './ClienteHeader.module.css';

const ClienteHeader = () => {
  return (
    <nav className={style.menu}>
      <Link to="cadastro">Cadastro de Cliente</Link>
      <Link to="atualizar">Atualizar Cliente</Link>
      <Link to="excluir">Excluir Cliente</Link>
    </nav>
  );
};

export default ClienteHeader;
