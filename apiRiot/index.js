require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');


const app = express();

const port = process.env.PORT || 3050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});