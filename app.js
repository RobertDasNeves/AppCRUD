const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const linkRoute = require('./routes/linkRoute');
require('dotenv').config();

// Configuração do Mongoose
mongoose.set('strictQuery', false);
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { family: 4 });

const db = mongoose.connection;

db.on("error", () => console.log("Erro ao conectar ao banco de dados!"));
db.once("open", () => console.log("Conexão ao banco de dados estabelecida!"));

// Configurações do Express
app.set('views', path.join(__dirname, './templates')); // Corrigir o caminho da pasta de templates
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public'))); // Configurar a pasta de arquivos estáticos
app.use('/', linkRoute);

// Rota principal
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Página 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
});

const PORT = process.env.PORT || 3000;

// Iniciando o servidor localmente
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
