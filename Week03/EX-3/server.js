

const express = require('express');
const app = express();

app.get('/student/:studentId', (req, res) => {

    const studentId = req.params.studentId;

    res.send(`Searching for student with ID: ${studentId}`);
});

app.listen(3000);