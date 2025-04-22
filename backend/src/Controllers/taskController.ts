import { Request, Response } from 'express';
import todoModel from '../Models/taskModel'
import task from '../Type/taskType'
import mongoose from 'mongoose';


export async function getTasks(req: Request, res: Response) {
    
    try {
        const tasks: task[] = await todoModel.find();
        res.status(200).send(tasks)
    } catch(error) {
        if (error instanceof Error) {
            res.status(500).send(error.message)
            return
        }

        res.status(500).send('An unknown error occured')
        
    }
}

export async function getTaskById(req: Request, res: Response) {
    
    try {
        if (!mongoose.isValidObjectId(req.params.id)){
            throw new Error('Invalid task id')
        }
        const task: task | null = await todoModel.findOne({_id: req.params.id})
        if (!task){
            throw new Error(`cannot find task with id ${req.params.id}`)
        }
        res.status(200).send(task)
    } catch (error) {
        if (error instanceof Error){
            if (error.message === `cannot find task with id ${req.params.id}`){
                res.status(404).send(error.message)
            } else if (error.message === 'Invalid task id'){
                res.status(400).send(error.message)
            }
            else {
                res.status(500).send(error.message)
            }
        }
        else {
            res.status(500).send('An unknown error occured')
        }
    }
}

export async function createTask(req: Request, res: Response) {
    
    const task: task = req.body

    try {
        const newTask = new todoModel({title: task.title, 
            description: task.description, 
            completed: task.completed ?? false})

        newTask.save()
        res.status(201).send('Task created !')
    } catch (error){
        if (error instanceof Error){
            res.status(500).send(error.message)
        }
        else {
            res.status(500).send('An Unknown error occured')
        }
    }
}

export async function updateTask(req: Request, res: Response) {
    
    const {title, description, completed} = req.body

    try {
        if (!mongoose.isValidObjectId(req.params.id)){
            throw new Error('Invalid task id')
        }

        const task: task | null= await todoModel.findById({_id: req.params.id})

        if (!task){
            throw new Error(`cannot find task with id ${req.params.id}`)
        }

        await todoModel.updateOne({ _id: req.params.id}, // Filter
        { $set: { title: title ?? task.title, description: description ?? task.description, completed: completed ?? task.completed } })

        res.status(200).send('Task Updated')

    } catch(error){
        if (error instanceof Error){
            if (error.message === "Invalid task id"){
                res.status(400).send("Bad request: Invalid Id format")
            }
            else if (error.message === `cannot find task with id ${req.params.id}`){
                res.status(404).send(`cannot find task with id ${req.params.id}`)
            }

            res.status(500).send(error.message)
        }
        else {
            res.status(500).send("An unknown error occured")
        }
    }
}

export async function deleteTask(req: Request, res: Response) {
    
    try {
        if (!mongoose.isValidObjectId(req.params.id)){
            throw new Error('Invalid task id')
        }
   
        const id = req.params.id
        const task: task | null = await todoModel.findOneAndDelete({_id: id})
        if (!task){
            throw new Error(`cannot find task with id ${req.params.id}`)
        }
        res.status(200).send("Task successfully deleted !")
   
    } catch (error) {
        if (error instanceof Error){
            if (error.message === "Invalid task id"){
                res.status(400).send("Bad request: Invalid Id format")
            }
            else if (error.message === `cannot find task with id ${req.params.id}`){
                res.status(404).send(`cannot find task with id ${req.params.id}`)
            }

            res.status(500).send(error.message)
        }
        else {
            res.status(500).send("An unknown error occured")
        }
    }
}

