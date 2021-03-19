const mongoose = require('mongoose')

const columnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Table'
    },
    databaseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Database'
    }
}, {
    timestamps: true
})

const Column = mongoose.model('Column', columnSchema)

module.exports = Column