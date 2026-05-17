const express = require('express');
const app = express();

const simpleGuard = (req, res, next) => {
    console.log("Someone is trying to access a route...");

    next();
};

app.use(simpleGuard);

app.get('/protected', (req, res) => {
    res.send('You passed the guard!');
});

app.listen(3000);