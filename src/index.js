 const express = require('express')
 require('./db/mongoose')
 const userRouter = require('./routes/userRoutes')
 const taskRouter = require('./routes/taskRoutes')

 const app = express()
 const port = process.env.PORT || 3000

 app.use(express.json())
 app.use(userRouter)
 app.use(taskRouter)

 app.listen(port, () => {
     console.log('Server is running on port ' + port)
 })