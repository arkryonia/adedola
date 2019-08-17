// Load express framework --> sounton@gmail.com : q3auLZo6HJ90D6sP
const dotenv     = require('dotenv')
const express    = require("express")
const bodyParser = require("body-parser")

// Fired up detenv
dotenv.config()

// Instanciate expressjs
const app        = express()

// Express extensions
app.use(bodyParser.json())

// Load mongoose
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database is fired up!")
}, (err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("This is our main endpoint!")
})

app.post('/book', (req, res) => {
    console.log(req.body)
    res.send("Testing our book route!")
})

app.listen(4545, () => {
    console.log("Up and running! --- This is our books service.")
})
