const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    databaseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Database'
    }
}, {
    timestamps: true
})

const Table = mongoose.model('Table', tableSchema)

module.exports = Table