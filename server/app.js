const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const dbinfo = require('./dbinfo.json');
const connection = `mongodb+srv://${dbinfo.username}:${dbinfo.password}@cluster0-jciwx.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    if (err) {
        console.log('failed to connect to db');
    }
});

db.once('open', () => {
    console.log('connected to db');
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const register = require('./routes/api/register');
app.use('/register', register);

const login = require('./routes/api/login');
app.use('/login', login);

app.get("/", (req, res) => {
    res.send('This is the landing page');
});

const PORT = 8080
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});
