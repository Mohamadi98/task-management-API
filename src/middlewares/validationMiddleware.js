const { body, validationResult } = require('express-validator');

const createTaskBodyValidation = () => {
    return [
        body('title').exists().withMessage('title not provided!'),
        body('description').exists().withMessage('description not provided!')
    ]
}

const updateTaskBodyValidation = () => {
    return [
        body().custom((value, { req, res }) => {
            const { title, description } = req.body;
            if (title !== undefined || description !== undefined) {
                return true;
            }
        }).withMessage('Please provide valid parameters to be updated!')
    ]
}

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ 'error': err.msg }))
    return res.status(400).json({ message: extractedErrors[0] });
}

module.exports = {
    createTaskBodyValidation,
    updateTaskBodyValidation,
    validator
}