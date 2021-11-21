const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/routes');

const app = express();

// Setting
app.set('port', process.env.PORT || 3000);
const port = app.get('port');

// Database
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost/';
const db = 'db_pos_bar';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url + db, options)
    .then(con => console.log(`Base de datos ${url} ${db} conectada correctamente`))
    .catch(error => console.error(error));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Routes
app.use('/', routes());

//Static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/uploads'));

// Server is listening
app.listen(port, () => {
    console.log(`Servidor conectado puerto ${port}`);
});