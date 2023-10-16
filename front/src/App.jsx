import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Cliente from './Cliente';
import Venda from './Venda';
import RelatorioVendas from './RelatorioVendas';
import Login from './Login';
import RelatorioVendasPorCliente from './RelatorioVendasPorCliente';
import Titulo from './Titulo';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem('loggedIn') &&
      localStorage.getItem('loggedIn') === 'true'
      ? true
      : false,
  );
  React.useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const handleClick = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <Router>
      <div>
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          onClick={handleClick}
        />
        <Routes>
          <Route
            path="/"
            element={<Titulo titulo="Selecione uma das opções acima" />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/cliente/*" element={<Cliente loggedIn={loggedIn} />} />
          <Route path="/venda" element={<Venda loggedIn={loggedIn} />} />
          <Route
            path="/relatorio-vendas"
            element={<RelatorioVendas loggedIn={loggedIn} />}
          />
          <Route
            path="/relatorio-vendas-cliente"
            element={<RelatorioVendasPorCliente loggedIn={loggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
