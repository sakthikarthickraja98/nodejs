const express = require('express');
const route = express.Router();

route.get('/params/:id',(req,res) => {
    res.send(req.params.id);
});

route.get('/:year/:month',(req,res) => {
    res.send(req.query);
});

module.exports = route;