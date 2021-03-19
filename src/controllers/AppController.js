const sql = require('mssql')
const Database = require('../models/Database')
const Table = require('../models/Table')
const Column = require('../models/Column')

class AppController {
    async populateMongo(req, res) {

        await Database.remove()
        await Table.remove()
        await Column.remove()

        const result = await sql.query('SELECT name FROM master.dbo.sysdatabases')

        const databases = result.recordset

        databases.map(async (db) => {
            if (db.name === 'TESTE' || db.name === 'AdventureWorksDW2012') {
                let name = db.name
                const database = new Database({
                    name
                })

                await database.save()
                let tables = await sql.query(` 
                    USE ${db.name}
                    SELECT TABLE_NAME, TABLE_SCHEMA
                    FROM INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG='${db.name}'`)

                let tableList = tables.recordset
                
                tableList.map(async (tableItem) => {
                    const table = new Table({
                        name: `${tableItem.TABLE_SCHEMA}.${tableItem.TABLE_NAME}`,
                        databaseId: database._id
                    })
                    await table.save()

                    let columns = await sql.query(`
                        USE ${db.name}
                        SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('${tableItem.TABLE_SCHEMA}.${tableItem.TABLE_NAME}') `)

                    let columnsList = columns.recordsets[0]

                    
                    columnsList.map(async (columnItem) => {
                        if (columnsList.length > 0) {
                            const column = new Column({
                                name: columnItem.name,
                                tableId: table._id,
                                databaseId: database._id
                            })

                            await column.save()
                        }

                    })
                })
            }
        })
        

        res.send('Dados inseridos!')
    }
    async databaseList(req, res){
        let databases = await Database.find()
        res.send(databases)
    }
    async tableList(req, res){
        let id = req.params.databaseId
        let tables = await Table.find({databaseId: id})
        res.send(tables)
    }
    async columnList(req, res){
        let id = req.params.tableId
        let columns = await Column.find({tableId: id})
            .populate('tableId', 'name')
            .populate('databaseId', 'name')
            .lean()

        let newObj = []
        columns.map((item) => {
            let itemObj = {
                _id: item._id,
                name: item.name,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                tableName: item.tableId.name,
                databaseName: item.databaseId.name
            }
            newObj.push(itemObj)
        })
        res.send(newObj)
    }
    async columnListAll(req, res){
        let columns = await Column.find({})
            .populate('tableId', 'name')
            .populate('databaseId', 'name')
            .lean()

        let newObj = []
        columns.map((item) => {
            let itemObj = {
                _id: item._id,
                key: item._id,
                name: item.name,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                tableName: item.tableId.name,
                databaseName: item.databaseId.name
            }
            newObj.push(itemObj)
        })
        res.send(newObj)
    }
}

module.exports = new AppController()