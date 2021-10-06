const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');

app.use(express.json());

app.use(logger);
app.use('/', home);
app.use('/courses', courses);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
