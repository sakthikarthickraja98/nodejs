const express = require('express');
const route = express.Router();
const Joi = require('joi');


const courses = [
    {id: 1, name: 'coure1' },
    {id: 2, name: 'coure2' },
    {id: 3, name: 'coure3' }
]


// to get all course
route.get('/', (req,res) => {
    res.send(courses);
});

// to get particular course
route.get('/:id',(req,res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) return res.status(404).send('No such id is found')
    res.send(course)
});

// to post a course
route.post('/',(req,res) => {

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
route.put('/:id',(req,res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) return res.status(404).send('No such id is found')

    const {error} = ValidateInput(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
})

// Delete course
route.delete('/:id',(req,res) =>{
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


module.exports = route;