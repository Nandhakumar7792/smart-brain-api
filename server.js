const express = require('express');

const app = express();

app.listen(3000, '/', (req, res) => {
    res.send('You are listenning to port 3000');
});