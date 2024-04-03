const uuidGenerator = require('../services/idGenerator');

const tasks = [
    {
        id: uuidGenerator(),
        title: "first task",
        description: "first task description",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuidGenerator(),
        title: "second task",
        description: "second task description",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const create = (taskData) => {
    taskData['id'] = uuidGenerator();
    taskData['createdAt'] = new Date();
    taskData['updatedAt'] = new Date();

    tasks.push(taskData);

    return 'Task created successfuly!'
}

const get = (page, limit) => {
    const offset = (page - 1) * limit;
    const notOutOfBoundIndex = Math.min(offset + limit, tasks.length);
    return tasks.slice(offset, notOutOfBoundIndex);
}

const getByID = (ID) => {
    const task = tasks.find(task => task.id === ID);

    if (task) {
        return {
            status: 'Success',
            message: null,
            data: task
        }
    } else {
        return {
            status: 'Error',
            message: `No task found matching this id: ${ID}`,
            data: null
        }
    }

}

const update = (ID, taskData) => {
    const taskIndex = tasks.findIndex(task => task.id === ID);

    if (taskIndex !== -1) {
        if (taskData.title !== undefined) {
            tasks[taskIndex].title = taskData.title;
        }
        if (taskData.description !== undefined) {
            tasks[taskIndex].description = taskData.description;
        }
        tasks[taskIndex].updatedAt = new Date();

        return {
            status: 'Success',
            message: 'Task updated successfuly!'
        }
    } else {
        return {
            status: 'Error',
            message: `No task found matching this id: ${ID}`,
        }
    }
}

const del = (ID) => {
    const taskIndex = tasks.findIndex(task => task.id === ID);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);

        return {
            status: 'Success',
            message: 'Task deleted successfuly!'
        }
    } else {
        return {
            status: 'Error',
            message: `No task found matching this id: ${ID}`
        }
    } 
}

module.exports = {
    create,
    get,
    getByID,
    update,
    del
}