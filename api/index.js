const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const { server } = require('./config')
const plantsRouter = require('./routes/plants')
const plantRouter = require('./routes/plant-by-id')
const updatePlantRouter = require('./routes/update-plant')

const app = express()

app.use(cors())
app.use(logger(server.environment))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    return res.send('Lets Grow!')
})

app.get('/plants', plantsRouter)
app.get('/plants/:plantId', plantRouter)

app.patch('/plants/:plantId/edit', updatePlantRouter)

app.listen(server.port, () =>
    console.log(`SERVER RUNNING ON PORT:${server.port}`)
)
