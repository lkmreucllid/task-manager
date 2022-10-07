const express = require('express')
const Task = require('../models/taskModel')
const taskRouter = express.Router()

//Create Task
/*
taskRouter.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
*/

//Create Task using Async Await
taskRouter.post('/tasks', async(req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Reading multiple Tasks
/*
taskRouter.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(501).send(e)
    })
})
*/

//Reading multiple tasks using Async Await
taskRouter.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(501).send(error)
    }
})


//Reading single task by Id
/*
taskRouter.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(501).send(e)
    })
})
*/

//Reading Single task using Async Await
taskRouter.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(501).send(error)
    }
})

//Promise Chaining to delete Task by Id and Fetch the Others
/*
taskRouter.get('tasks/:id', (req, res) => {
    Task.findByIdAndDelete('dsjhfsdggsdgsdg').then(() => {
        return Task.countDocuments({ completed: false })
    }).then((result) => {
        console.log(result)
    }).catch((e) => {
        console.log(e)
    })
})
*/



//Async Await to delete the task by id and check count
/*
const deleteTaskAndCount = async(id) => {
    await Task.findByIdAndRemove(id)
    const count = await Task.count({ completed: false })
    return count
}

deleteTaskAndCount('633a8dff8bd5e71d88e1aaf1').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
*/


//Updating task using Async Await
taskRouter.patch('/tasks/:id', async(req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})



//Deleting Task using Async Await
taskRouter.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = taskRouter