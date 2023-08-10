
var express = require('express');
var { engine } = require('express-handlebars');

var app = express();

var bodyParser = require('body-parser');

app.engine('handlebars', engine({ defaultLayout: 'principal' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

 
app.use(express.static(__dirname + '/publico'));


const users = [];


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('login');
});


app.post('/', (req, res) => {
    const { name, email, password } = req.body;


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

app.get('/fmcontato', function (req, res) {
    res.render('fmcontato');
});

app.post('/contato', (req, res) => {
  const { name, phone, description } = req.body;
  
  res.redirect('/fmcontato');

});

app.get('/horario', function (req, res) {
    res.render('horario');
});


app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});


app.post('/cadastro', (req, res) => {
    const { name, email, password, numero, weight, height } = req.body;


    users.push({ name, email, password, numero, weight, height });

   
    res.redirect(`/suceso?name=${name}`);
});


app.get('/suceso', (req, res) => {
    const name = req.query.name;

    res.render('suceso', { name });
});



app.get('/naocadastrado', (req, res) => {
    res.render('naocadastrado');
});


app.get('/dados', (req, res) => {
    res.render('dados', { users });
});

// Servidor
app.listen(3000);
