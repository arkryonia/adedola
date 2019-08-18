// Load express framework --> sounton@gmail.com : q3auLZo6HJ90D6sP
const dotenv     = require('dotenv')
const express    = require("express")
const bodyParser = require("body-parser")
const mongoose   = require("mongoose")

// Load models
const Book = require('./Book')


// Fired up detenv
dotenv.config()

// Instanciate expressjs
const app        = express()

// Express extensions
app.use(bodyParser.json())

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

app.get('/books', (req, res) => {
    Book.find().then(books => {
        res.status(200).json(books)
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.status(200).json(book)
        } else {
            res.status(404).json("Ooops! Can't get this object.")
        }
    }).catch(err => {
        if (err) {
            throw err
        }
    })
})

app.post('/books', (req, res) => {
    const data = req.body
    const book = new Book({
        title: data.title,
        author: data.author,
        numberPages: data.numberPages,
        publisher: data.publisher
    })
    book.save(book).then(() => {
        console.log("New book created")
    }).catch((err) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        }
    })
    res.status(200).json({
        message: "A new book is created!"
    })
})

app.listen(4545, () => {
    console.log("Up and running! --- This is our books service.")
})
