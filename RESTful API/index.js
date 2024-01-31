const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Dados de exemplo para simular um banco de dados temporário
const camisetas = {
  1: {
    camiseta: 'Camiseta vermelha',
    tamanho: 'G',
    marca: 'Adidas'
  },
  2: {
    camiseta: 'Camiseta preta',
    tamanho: 'P',
    marca: 'Nike'
  }
}

// Rota inicial
app.get('', (req, res) => {
  res.send({mensagem: 'Olá, Turma de ES2!'});
});

// Rota para obter todas as camisetas
app.get('/camisetas', (req, res) => {
  res.status(200).json(camisetas);
});

// Rota para criar uma nova camiseta (POST)
app.post('/camisetas', (req, res) => {
  const { camiseta, tamanho, marca } = req.body;

  if (!camiseta || !tamanho || !marca) {
    return res.status(400).json({ error: 'Preencha todos os campos: camiseta, tamanho, marca' });
  }

  // Simulando a criação de uma nova camiseta
  const novaCamisetaId = Object.keys(camisetas).length + 1;
  camisetas[novaCamisetaId] = { camiseta, tamanho, marca };

  return res.status(201).json(camisetas[novaCamisetaId]);
});

// Rota para obter uma camiseta específica
app.get('/camisetas/:id', (req, res) => {
  const camisetaId = req.params.id;
  const camiseta = camisetas[camisetaId];

  if (!camiseta) {
    return res.status(404).json({ error: 'Camiseta não encontrada' });
  }

  return res.status(200).json(camiseta);
});

// Rota para excluir uma camiseta (DELETE)
app.delete('/camisetas/:id', (req, res) => {
  const camisetaId = req.params.id;
  const camiseta = camisetas[camisetaId];

  if (!camiseta) {
    return res.status(404).json({ error: 'Camiseta não encontrada' });
  }

  // Exclusão de uma camiseta
  delete camisetas[camisetaId];

  return res.status(200).json(camiseta);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});