// ./routes/index.js
const trivia = require('./trivia')

module.exports = (app) => {
    app.use('/trivia', trivia)
}
