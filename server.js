const express = require('express');

const app = express();

app.get('/api/customers', (req, res, next) => {
    customers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe"
        }, {
            id: 2,
            firstName: "Mark",
            lastName: "Done"
        }, {
            id: 3,
            firstName: "Merry",
            lastName: "Jane"
        }
    ];
    res.json(customers);
});

const port = 5000;

app.listen(port, () => console.log(`Server starerd on port ${port}`));