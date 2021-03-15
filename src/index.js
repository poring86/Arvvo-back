require('./database/mongodb')
const express = require('express')
const app = express()

const port = process.env.PORT

const routes = require('./routes')

app.use(routes)

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})