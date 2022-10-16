 const express = require('express')
 require('./db/mongoose')
 const userRouter = require('./routes/userRoutes')
 const taskRouter = require('./routes/taskRoutes')

 const app = express()
 const port = process.env.PORT || 3000

 const multer = require('multer')
 const upload = multer({
     dest: 'images',
     limits: {
         fileSize: 1000000,
     },
     fileFilter(req, file, cb) {
         if (!file.originalname.match(/\.(doc|docx)$/)) {
             return cb(new Error('Please Upload a Word Document'))
         }
         cb(undefined, true)
     }
 })

 app.post('/upload', upload.single('upload'), (req, res) => {
     res.send()
 })

 app.get('/', (req, res) => {

     res.send(`APIs are working`)
 })


 app.use(express.json())
 app.use(userRouter)
 app.use(taskRouter)

 app.listen(port, () => {
     console.log('Server is running on port ' + port)
 })