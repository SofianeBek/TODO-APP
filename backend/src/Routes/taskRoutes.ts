import express from 'express'
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../Controllers/taskController';


const todoRouter = express.Router()

todoRouter.get('/', getTasks);
todoRouter.get('/:id', getTaskById);
todoRouter.post('/', createTask);
todoRouter.patch('/:id', updateTask)
todoRouter.delete('/:id', deleteTask)

export default todoRouter