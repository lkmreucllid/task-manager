const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
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
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(501).send(error)
    }
})

//Reading Multiple users using Async Await
userRouter.get('/users/me', auth, async(req, res) => {
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
userRouter.patch('/users/updateMe', auth, async(req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        //Above stattement mess with Mongoose Middleware, so it is okay to below statments
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Deleting user with Async Await
userRouter.delete('/users/me', auth, async(req, res) => {
    try {
        //mongoose middleware to remove user that auth send through req
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please Upload an imgae'))
        }
        cb(undefined, true)
    }
})

//Upload profile pic
userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    try {
        //remove dest from upload to get file.buffer  data here
        // req.user.avatar = req.file.buffer

        const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer()
        req.user.avatar = buffer

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(501).send()
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//delete the profile pic
userRouter.delete('/users/me/avatar', auth, async(req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(501).send()
    }
})

//fetch user profile to show
userRouter.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})


module.exports = userRouter