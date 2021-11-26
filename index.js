const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");

const { initFirebase, getDocument, setDocument, updateDocument, deleteDocument } = require("./firebase.js");

initFirebase();

var app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

let HTTP_PORT = 3000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname });
});

app.get("/app/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname });
});

app.get("/app/:path/", (req, res) => {
    const path = req.params.path;
    
    res.sendFile(`public/${path}.html`, {root: __dirname });
});

app.use("/app/:method/:collection/:docID", async (req, res) => {
    const docID = req.params.docID;
    const collection = req.params.collection;
    const method = req.params.method;

    let result;

    if (method == "get") {
        result = await getDocument(collection, docID);
    } else if (method == "post") {
        const data = req.body.data;
        result = await setDocument(collection, docID, data);
    } else if (method == "patch") {
        const data = req.body.data;
        result = await updateDocument(collection, docID, data);
    } else if (method == "delete") {
        result = await deleteDocument(collection, docID);
    }

    res.status(200).json(result);
});