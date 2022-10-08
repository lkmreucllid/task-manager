const express = require('express')
const User = require('../models/userModel')
const auth = require('../middleware/auth')
const userRouter = new express.Router()

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

//User Logout
userRouter.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('User Logged Out Successfully')
    } catch (error) {
        res.status(500).send()
    }
})

//User LogoutALL
userRouter.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('User Logged Out Successfully')
    } catch (error) {
        res.status(500).send()
    }
})

//Reading Multiple users using Async Await
userRouter.get('/users', auth, async(req, res) => {
    try {
        //const users = await User.find({})
        //res.send(users)
        res.send(req.user)
    } catch (error) {
        res.status(501).send(error)
    }
})

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