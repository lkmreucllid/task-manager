const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', async function(next) {
    next()
})

const Task = mongoose.model('Task', taskSchema)


// const task1 = new Task({
//     description: '   MinLength not working in Mongoose validators   ',

// })

// task1.save().then(() => {
//     console.log(task1)
// }).catch((error) => {
//     console.log(error)
// })


module.exports = Task