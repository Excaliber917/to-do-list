const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find({})
    res.status(200).json({ allTasks })
})

const createtask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const gettask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(201).json({ task })

})
const updatetask = asyncWrapper(async (req, res) => {


    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, runValidators: true,
    })
    if (!task)
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    res.status(201).json({ task })

})
const deletetask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task)
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    res.status(201).json({ task })
})

module.exports = {
    getAllTasks,
    createtask,
    gettask,
    updatetask,
    deletetask,
}