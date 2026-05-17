const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Try visiting http://localhost:3000/index.html");
});