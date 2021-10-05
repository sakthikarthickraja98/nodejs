const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'coure1' },
    {id: 2, name: 'coure2' },
    {id: 3, name: 'coure3' }
]


// to get all course
app.get('/courses', (req,res) => {
    res.send(courses);
});

// to get particular course
app.get('/courses/:id',(req,res) => {
    const course = courses.find(c => c.id == req.params.id)
    if(!course) return res.status(404).send('No such id is found')
    res.send(course)
});

// to post a course
app.post('/courses',(req,res) => {
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if (result.error){
       res.status(400).send(result.error.details[0].message);
       return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/courses/particular/:id',(req,res) => {
    res.send(req.params.id);
});

app.get('/courses/:year/:month',(req,res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
