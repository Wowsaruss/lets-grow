const express = require('express')
const { getOne } = require('../services/plants')

const router = express.Router()

router.use('/plants/:plantId', async (req, res) => {
    const { data } = await getOne(req.params.plantId)

    return res.send(data)
})

module.exports = router
