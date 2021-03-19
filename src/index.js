require('./databases/mongodb')
require('./databases/sql')
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const port = process.env.PORT

app.use(cors())


app.use(routes)

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})