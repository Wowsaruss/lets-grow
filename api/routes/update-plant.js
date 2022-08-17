const express = require('express')
const { updateOne } = require('../services/plants')

const router = express.Router()

router.use('/plants/:plantId/edit', async (req, res) => {
    const { data } = await updateOne(req.params.plantId, req.body)

    return res.send(data)
})

module.exports = router
