const express = require('express')
const User = require('../models/userModel')
const userRouter = new express.Router()

//Create User
/*
userRouter.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
*/

//Creating user with Asyn Await
//Same as above but with Asyn Await instead of promises
userRouter.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Login User
userRouter.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }

})

//Reading Multiple Users
/*
userRouter.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(501).send(e)
    })
})
*/

//Reading Multiple users using Async Await
userRouter.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(501).send(error)
    }
})

//Reading Single User information
/*
userRouter.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
*/

//Reading single user information using Async Await
userRouter.get('/users/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


//Updating user using Asyn Await
userRouter.patch('/users/:id', async(req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        //Above stattement mess with Mongoose Middleware, so it is okay to below statments

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            res.status(404).send
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Deleting user with Async Await
userRouter.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = userRouter