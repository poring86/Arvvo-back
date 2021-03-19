const sql = require('mssql')

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
}

try{
    sql.connect(config)
    console.log('Connected to SQL!')
}
catch(e){
    console.log(e)
}
