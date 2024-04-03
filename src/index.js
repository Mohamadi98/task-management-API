const uuidGenerator = require('./services/idGenerator');
const taskRouter = require('./controllers/taskController');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(
    morgan('combined', {
        skip: (req) => req.method === "OPTIONS",
    })
);
app.use(bodyParser.json());
app.use(taskRouter);
app.get('/', (_req, res) => {
    res.send('server started');
});

app.listen(PORT, () => {
    console.log(`Server running on port = ${PORT}`);
});

module.exports = app;