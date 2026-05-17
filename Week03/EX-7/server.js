const express = require('express');
const app = express();

app.get('/check-score', (req, res) => {
  const score = req.query.score;

  if (score < 50) {
    res.status(400).json({ error: "Score too low" });
  } else {
    res.status(200).send("You passed!");
  }
});

app.listen(3000);