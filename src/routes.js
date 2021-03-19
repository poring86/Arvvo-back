const express = require('express')
const router = new express.Router()

const AppController = require('./controllers/AppController')

router.get('/', AppController.populateMongo)

router.get('/databases', AppController.databaseList)

router.get('/tables/:databaseId', AppController.tableList)

router.get('/columns/:tableId', AppController.columnList)

router.get('/columns', AppController.columnListAll)

module.exports = router