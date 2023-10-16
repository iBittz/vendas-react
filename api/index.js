const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('../db-teste.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// CRUD - Cadastro de Clientes

app.get('/cliente', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  db.all('SELECT * FROM cliente', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get('/cliente/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  db.get(
    'SELECT * FROM cliente WHERE cod_cliente = ?',
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!row) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(row);
      }
    },
  );
});

app.post('/cliente', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const {
    des_nome,
    des_endereco,
    num_endereco,
    des_cidade,
    des_uf,
    des_telefone,
    des_contato,
  } = req.body;
  if (
    !des_nome ||
    !des_endereco ||
    !num_endereco ||
    !des_cidade ||
    !des_uf ||
    !des_telefone ||
    !des_contato
  ) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    db.run(
      'INSERT INTO cliente (des_nome, des_endereco, num_endereco, des_cidade, des_uf, des_telefone, des_contato, dta_ult_pedido, dta_cadastro, dta_alteracao) VALUES (?, ?, ?, ?, ?, ?, ?, "2023-08-30", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [
        des_nome,
        des_endereco,
        num_endereco,
        des_cidade,
        des_uf,
        des_telefone,
        des_contato,
      ],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({
            id: this.lastID,
            des_nome,
            des_endereco,
            num_endereco,
            des_cidade,
            des_uf,
            des_telefone,
            des_contato,
          });
        }
      },
    );
  }
});

app.put('/cliente/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  const {
    des_nome,
    des_endereco,
    num_endereco,
    des_cidade,
    des_uf,
    des_telefone,
    des_contato,
  } = req.body;
  if (
    !des_nome ||
    !des_endereco ||
    !num_endereco ||
    !des_cidade ||
    !des_uf ||
    !des_telefone ||
    !des_contato
  ) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    db.run(
      'UPDATE cliente SET des_nome = ?, des_endereco = ?, num_endereco = ?, des_cidade = ?, des_uf = ?, des_telefone = ?, des_contato = ?, dta_alteracao = CURRENT_TIMESTAMP WHERE cod_cliente = ?',
      [
        des_nome,
        des_endereco,
        num_endereco,
        des_cidade,
        des_uf,
        des_telefone,
        des_contato,
        req.params.id,
      ],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(200).json({
            id: req.params.id,
            des_nome,
            des_endereco,
            num_endereco,
            des_cidade,
            des_uf,
            des_telefone,
            des_contato,
          });
        }
      },
    );
  }
});

app.delete('/cliente/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  db.run(
    'DELETE FROM cliente WHERE cod_cliente = ?',
    [req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ deleted: true });
      }
    },
  ).get(
    'DELETE FROM venda WHERE cod_cliente = ? returning cod_venda',
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!row) {
        res.status(404).json({ error: 'User not found' });
      } else {
        db.run(
          'DELETE FROM venda_item WHERE cod_venda = ?',
          [row.cod_venda],
          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
            }
          },
        );
      }
    },
  );
});

app.options('/cliente', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.status(200).send();
});

// CRUD - Cadastro de Vendas

app.get('/vendas', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { start, end } = req.query;
  let s = start.replace(/-/g, '');
  let e = end.replace(/-/g, '');
  db.all(
    'SELECT * FROM venda where substr(dta_venda,1,4)||substr(dta_venda,6,2)||substr(dta_venda,9) between ? and ?',
    [s, e],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(rows);
      }
    },
  );
});

app.get('/venda/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  db.all(
    'SELECT * FROM venda WHERE cod_venda = ?',
    [req.params.id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!rows) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(rows);
      }
    },
  );
});

app.post('/venda', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { dta_venda, cod_cliente, val_total_venda, itens } = req.body;
  let id = 0;
  if (!dta_venda || !cod_cliente || !val_total_venda || !itens) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    db.get(
      'SELECT val_venda_acumulado,qtd_venda_pedidos,dta_ult_pedido FROM cliente WHERE cod_cliente = ?',
      [cod_cliente],
      (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (!row) {
          res.status(404).json({ error: 'User not found' });
        } else {
          const val_venda_acumulado = row.val_venda_acumulado + val_total_venda;
          const qtd_venda_pedidos = row.qtd_venda_pedidos + 1;
          dta_venda > row.dta_ult_pedido ? dta_venda : row.dta_ult_pedido;
          db.run(
            'UPDATE cliente SET val_venda_acumulado = ?, qtd_venda_pedidos = ?, dta_ult_pedido = ?, dta_alteracao = CURRENT_TIMESTAMP WHERE cod_cliente = ?',
            [val_venda_acumulado, qtd_venda_pedidos, dta_venda, cod_cliente],
            function (err) {
              if (err) {
                res.status(500).json({ error: err.message });
              }
            },
          );
        }
      },
    );
    const sqls = [
      'INSERT INTO venda (dta_venda, cod_cliente, val_total_venda) VALUES (?, ?, ?)',
      'INSERT INTO venda_item (cod_venda, cod_item, des_produto, val_unitario, qtd_itens, val_total, dta_cadastro) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    ];
    db.serialize(() => {
      db.run(
        sqls[0],
        [dta_venda, cod_cliente, val_total_venda],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            id = this.lastID;
            itens.forEach((item) => {
              db.run(
                sqls[1],
                [
                  id,
                  item.cod_item,
                  item.des_produto,
                  item.val_unitario,
                  item.qtd_itens,
                  item.val_total,
                ],
                function (err) {
                  if (err) {
                    return;
                  }
                },
              );
            });
            res.status(200).json('Ok');
          }
        },
      );
    });
  }
});

app.get('/itens/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  db.all(
    'SELECT * FROM venda_item WHERE cod_venda = ?',
    [req.params.id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!rows) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(rows);
      }
    },
  );
});

app.post('/login', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    db.get(
      'SELECT flg_inativo FROM usuario WHERE des_email = ? AND des_senha = ?',
      [username, password],
      (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (!row) {
          res.status(404).json({ error: 'User not found' });
        } else if (row.flg_inativo === 1) {
          res.status(401).json({ error: 'User inactive' });
        } else {
          res.status(200).json({ username, password });
        }
      },
    );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
