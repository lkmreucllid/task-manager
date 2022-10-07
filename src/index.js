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


 const jwt = require('jsonwebtoken')

 const myFunction = async() => {

     //  const password = 'Red12345!'
     //  const hashedPassword = await bcrypt.hash(password, 8)
     //  const isMatch = await bcrypt.compare('Red12345!', hashedPassword)

     //  console.log(password)
     //  console.log(hashedPassword)
     //  console.log(isMatch)

     const token = jwt.sign({ _id: 'abc123' }, 'thisisnewJSONWEBTOKEN', { expiresIn: '7 days' })
     console.log(token)
     const data = jwt.verify(token, 'thisisnewJSONWEBTOKEN')
     console.log(data)

 }
 myFunction()