import express, { Application } from 'express'
import cors from 'cors'
import { UserRouters } from './modules/user/user.route'
import { StudentRoutes } from './modules/student/student.route'
import globalErrorHandler from './middleware/globalErrorHandler'
import notFound from './middleware/notFound'

const app: Application = express()
app.use(express.json())
app.use(cors())

//Application routes
app.use('/api/users',UserRouters)
app.use('/api/students',StudentRoutes)


app.use(globalErrorHandler)
//not found
app.use(notFound)

export default app