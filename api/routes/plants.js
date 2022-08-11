const express = require('express')
const { getMany } = require('../services/plants')

const router = express.Router()

router.use('/plants', async (req, res) => {
    const { data } = await getMany()

    return res.send(data)
})

module.exports = router
