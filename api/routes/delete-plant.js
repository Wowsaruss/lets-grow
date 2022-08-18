const express = require('express')
const { deleteOne } = require('../services/plants')

const router = express.Router()

router.use('/plants/:plantId/delete', async (req, res) => {
    await deleteOne(req.params.plantId)

    return res.send()
})

module.exports = router
