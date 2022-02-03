const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const {server} = require('./config');
const triviaRouter = require('./routes/trivia');
// const bodyParser = require('body-parser');
// const axios = require('axios');

const app = express();

app.use(cors());
app.use(logger(server.environment));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.send("WELCOME!");
});

app.get('/trivia', triviaRouter);

app.listen(server.port, () => console.log(`SERVER RUNNING ON PORT:${server.port}`));