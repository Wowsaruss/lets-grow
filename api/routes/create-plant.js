const express = require('express')
const { createOne } = require('../services/plants')

const router = express.Router()

router.use('/plants/new', async (req, res) => {
    const { data } = await createOne(req.body)

    return res.send(data)
})

module.exports = router
