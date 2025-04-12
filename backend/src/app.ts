import express, { Router } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import todoRoutes from './Routes/taskRoutes'


dotenv.config();

const app = express();

app.use(express.json())

//ROUTE

app.use('/api/todo', todoRoutes)

mongoose.connect(process.env.MONGO_URI || '', {
    dbName: 'TODODB'
}).then(() => {
    console.log(('MongoDB Connected'));
}).catch(err => console.error(err))

export default app;