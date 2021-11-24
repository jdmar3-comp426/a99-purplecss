var express = require("express")
var app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

app.get("/app/", (req, res, next) => {
    
});