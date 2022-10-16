const mongoose = require('mongoose')
const validator = require('validator')

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true
// })


mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connect to MongoDB..', err))