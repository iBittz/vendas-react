import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.css';

const Header = ({ loggedIn, onClick }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  React.useEffect(() => {
    switch (window.location.pathname) {
      case '/cliente':
        document.title = 'Administração de Clientes';
        break;
      case '/cliente/cadastro':
        document.title = 'Cadastro de Cliente';
        break;
      case '/cliente/atualizar':
        document.title = 'Atualização de Cliente';
        break;
      case '/cliente/excluir':
        document.title = 'Exclusão de Cliente';
        break;
      case '/venda':
        document.title = 'Venda';
        break;
      case '/relatorio-vendas':
        document.title = 'Relatório de Vendas';
        break;
      case '/relatorio-vendas-cliente':
        document.title = 'Relatório de Vendas por Cliente';
        break;
      default:
        document.title = 'Sistema de Vendas';
    }
  });

  return (
    <nav className={style.menu}>
      <Link to="/cliente">Cadastro de Cliente</Link>
      <Link to="/venda">Venda</Link>
      <Link to="/relatorio-vendas">Relatório de Vendas</Link>
      <Link to="/relatorio-vendas-cliente">
        Relatório de Vendas por Cliente
      </Link>
      {loggedIn && (
        <Link to="/login" onClick={onClick}>
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Header;
