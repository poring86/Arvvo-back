const mongoose = require('mongoose')

const databaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Database = mongoose.model('Database', databaseSchema)

module.exports = Database