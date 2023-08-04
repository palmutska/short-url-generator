const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/styles'));

app.use('/', require('./routes/urlRedirect'));
app.use('/', require('./routes/urlGenerator'));
app.use('/', require('./routes/urlInfo'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 4111;
app.listen(PORT, () => console.log("Server started at port: " + PORT));
