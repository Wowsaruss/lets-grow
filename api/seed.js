const { Client } = require('pg')
const config = require('./config')

const client = new Client(config.db)
client.connect()

const query = `CREATE TABLE vegetables (
    name varchar(1000),
    regions array,
    createdAt timestamp,
    updatedAt timestamp
    );`

client.query(query, (err, res) => {
    if (err) {
        console.log(err, 'hit!!!!!!')
        console.error(err)
        return
    }
    console.log('Table is successfully created')
    client.end()
})
