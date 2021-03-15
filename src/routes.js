const express = require('express')
const router = new express.Router()

const AppController = require('./controllers/AppController')

router.get('/', AppController.populateMongo)

module.exports = router