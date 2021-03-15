const { v4: uuidv4 } = require('uuid')
const sql = require('mssql')

class AppController {
    async populateMongo(req, res){
        const config = {
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            server: process.env.SQL_SERVER,
            database: process.env.SQL_DATABASE,
        }

        

        try {
           
            await sql.connect(config)
            console.log(config)
            const result = await sql.query('SELECT name FROM master.dbo.sysdatabases')
            
            const databases = result.recordset

            console.log(databases)
    
            databases.map( async (db) => {
    
            })
            
        } catch (err) {
            console.log(err)
            // ... error checks
        }
        res.send('populateMongo')
    }
}

module.exports = new AppController()