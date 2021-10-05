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
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) return res.status(404).send('No such id is found')
    res.send(course)
});

// to post a course
app.post('/courses',(req,res) => {

    const {error} = ValidateInput(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// to edit course
app.put('/courses/:id',(req,res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) return res.status(404).send('No such id is found')

    const {error} = ValidateInput(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
})

// Delete course
app.delete('/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) return res.status(404).send('No such id is found')

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

// validate input
function ValidateInput(course) {
  const schema = Joi.object({
      name: Joi.string().min(3).required()
  });

  return schema.validate(course);
}

app.get('/courses/particular/:id',(req,res) => {
    res.send(req.params.id);
});

app.get('/courses/:year/:month',(req,res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
