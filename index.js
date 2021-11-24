const express = require("express");
const path = require('path');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

let HTTP_PORT = 3000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

app.get("/app/", (req, res, next) => {
    res.sendFile('public/index.html', {root: __dirname })
});

app.get("/app/:path/", (req, res, next) => {
    const path = req.params.path;
    
    res.sendFile(`public/${path}.html`, {root: __dirname })
});