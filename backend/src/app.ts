import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { json } from 'stream/consumers';


dotenv.config();

const app = express();

app.use(express.json())


mongoose.connect(process.env.MONGO_URI || '', {
    dbName: 'TODODB'
}).then(() => {
    console.log(('MongoDB Connected'));
}).catch(err => console.error(err))

export default app;