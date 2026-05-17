const express = require('express');
const app = express();

app.get('/shop', (req, res) => {

    const itemName = req.query.item;
    const itemPrice = req.query.price;

    res.json({
        product: itemName,
        cost: itemPrice
    });
});

app.listen(3000);