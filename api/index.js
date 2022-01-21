const express = require('express')
const axios = require('axios')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const port = 7070

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    return res.send("WELCOME!");
});

app.get('/api/trivia', async (req, res) => {
    const {data} = await axios.get("https://jservice.io/api/random?count=10")

    return res.send(data);
});

app.listen(port, () => console.log(`SERVER RUNNING ON PORT:${port}`));