const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));
app.use(cors());
let tasksRouter = require('./routes/tasks.router');
app.use('/tasks', tasksRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});