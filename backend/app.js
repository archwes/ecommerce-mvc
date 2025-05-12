const authRoutes = require('./routes/Auth');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB');
  app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
})
.catch(err => {
  console.error('Erro ao conectar no MongoDB:', err);
});
