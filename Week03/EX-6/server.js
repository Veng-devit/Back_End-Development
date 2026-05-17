const express = require('express');
const app = express();

app.use(express.json());

app.post('/echo', (req, res) => {
  const receivedData = req.body;

  res.json({
    message: "I received your data!",
    data: receivedData
  });
});

app.listen(3000);