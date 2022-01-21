const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use('/trivia', async (req, res) => {
    const {data} = await axios.get("https://jservice.io/api/random?count=10");

    return res.send(data);
});

module.exports = router;