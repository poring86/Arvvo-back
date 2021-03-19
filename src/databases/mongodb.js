const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL

try{
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('Connected to Mongo!')
}
catch(e){
    console.log(e)
}