// Variáveis do express e do handlebars
var express = require('express');
var { engine } = require('express-handlebars');
// const User = require('./models/User');

// App
var app = express();

var bodyParser = require('body-parser');

// Template
app.engine('handlebars', engine({ defaultLayout: 'principal' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Especificar arquivos estáticos 
app.use(express.static(__dirname + '/publico'));

// Array para armazenar os usuários cadastrados
const users = [];

// Configurar o body-parser para lidar com solicitações JSON
app.use(bodyParser.json());

// Configurar o body-parser para lidar com solicitações URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));



// Rotas
app.get('/', (req, res) => {
    res.render('login');
});


app.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Verificar se o usuário está cadastrado
    const isRegistered = users.some(user => user.name === name && user.email === email && user.password === password);

    if (isRegistered) {
        res.redirect(`/suceso?name=${name}`);
    } else {
        res.redirect('/naocadastrado');
    }
});


app.get('/inicio', function (req, res) {
    res.render('inicio');
});

app.get('/quemsomos', function (req, res) {
    res.render('quemsomos');
});

app.get('/contato', function (req, res) {
    res.render('contato');
});
app.post('/contato', (req, res) => {
  const { name, phone, description } = req.body;

  res.send('Formulário enviado com sucesso!');
});

app.get('/horario', function (req, res) {
    res.render('horario');
});

// Rota para exibir o formulário de login
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota para lidar com o envio do formulário de login
app.post('/cadastro', (req, res) => {
    const { name, email, password, numero, weight, height } = req.body;

    // Armazenar os dados do usuário cadastrado
    users.push({ name, email, password, numero, weight, height });

    // Redirecionar para a página de sucesso após o login bem-sucedido
    res.redirect(`/suceso?name=${name}`);
});

// Rota para exibir a página de sucesso
app.get('/suceso', (req, res) => {
    const name = req.query.name;

    res.render('suceso', { name });
});



app.get('/naocadastrado', (req, res) => {
    res.render('naocadastrado');
});

// Rota para exibir os dados cadastrados
app.get('/dados', (req, res) => {
    res.render('dados', { users });
});

// Servidor
app.listen(3000);
