const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const posts = require('./routes/api/posts')

app.use('/api/posts', posts)

if (process.env.NODE_ENV === 'production') {
	// Static folder (in our case server/public)
	app.use(express.static(__dirname + '/public/'))
	// handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

// any route that goes thru api/posts will be directed thru const posts and then the router will go on from there
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server started on port ${port}`))
