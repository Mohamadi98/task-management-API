const express = require('express');
const taskServices = require('../services/taskServices');
const validationMiddleware = require('../middlewares/validationMiddleware');

const taskRouter = express.Router();

const create = (req, res) => {
    const { title, description } = req.body;
    const taskData = {
        title: title,
        description: description
    }
    const message = taskServices.create(taskData);

    res.status(201).json({
        message: message
    })
}

const get = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5
    const sorted = parseInt(req.query.sorted) || 0;

    let tasks = taskServices.get(page, limit);
    if (sorted === 1) {
        tasks = tasks.sort((a, b) => b.updatedAt - a.updatedAt);
    }

    res.status(200).json({
        data: tasks
    });
}

const getByID = (req, res) => {
    const ID = req.params.id;
    const task = taskServices.getByID(ID);
    if (task.status !== 'Success') {
        return res.status(404).json({
            message: task.message
        });
    }

    res.status(200).json({
        message: task.data
    });

}

const update = (req, res) => {
    const ID = req.params.id;
    const { title, description } = req.body;
    const taskData = {
        title: title,
        description: description
    }
    const updatedTask = taskServices.update(ID, taskData);
    if (updatedTask.status !== "Success") {
        return res.status(404).json({
            message: updatedTask.message
        });
    }

    res.status(200).json({
        message: updatedTask.message
    });
}

const del = (req, res) => {
    const ID = req.params.id;
    const deletedTask = taskServices.del(ID);
    if (deletedTask.status !== "Success") {
        return res.status(404).json({
            message: deletedTask.message
        });
    }

    res.status(200).json({
        message: deletedTask.message
    });
}

taskRouter.post('/tasks', validationMiddleware.createTaskBodyValidation(),
    validationMiddleware.validator, create);
taskRouter.get('/tasks/', get);
taskRouter.get('/tasks/:id', getByID);
taskRouter.put('/tasks/:id', validationMiddleware.updateTaskBodyValidation(),
    validationMiddleware.validator, update);
taskRouter.delete('/tasks/:id', del);

module.exports = taskRouter;