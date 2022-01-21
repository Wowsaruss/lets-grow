const express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var path = require('path');
var logger = require('morgan');
// const bodyParser = require('body-parser');
// const axios = require('axios');

const triviaRouter = require('./routes/trivia');

const app = express();
const env = process.env;

app.use(cors());
app.use(logger(env.ENVIRONMENT));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.send("WELCOME!");
});

app.get('/trivia', triviaRouter);

app.listen(env.SERVER_PORT, () => console.log(`SERVER RUNNING ON PORT:${env.SERVER_PORT}`));