const express = require("express");
const path = require('path');
const { initFirebase, getDocument } = require("./firebase.js");

initFirebase();

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

let HTTP_PORT = 3000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

app.get("/", (req, res) => {
    res.redirect("/app/");
});

app.get("/app/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname })
});

app.get("/app/:path/", (req, res) => {
    const path = req.params.path;
    
    res.sendFile(`public/${path}.html`, {root: __dirname })
});

app.get("/api/get/:collection/:docId", async (req, res) => {
    const docID = req.params.docId;
    const collection = req.params.collection;

    const data = await getDocument(collection, docID);

    res.status(200).json(data);
});