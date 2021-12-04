// Import requried libaries
const express = require("express");
const bodyParser = require("body-parser");

// Import required Firebase functions to reference
const { initFirebase, getDocument, setDocument, updateDocument, deleteDocument } = require("./firebase.js");

// Initialize the Firebase database
initFirebase();

// Init express app with required settings
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

let HTTP_PORT = 3000; // Which port HTTP will served on

/**
 * Summary.
 * Start the server on {HTTP_PORT}
 */
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

/**
 * Summary.
 * If user routes to root directory through the browser load the index/home page.
 * 
 * @return The root HTML page.
 */
app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname }); // Send the index page
});

/**
 * Summary.
 * If user routes to /app/ directory through the browser load the index/home page.
 * 
 * @returns The root HTML page.
 */
app.get("/app/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname });  // Send the index page
});

/**
 * Summary.
 * If user goes to any page following /app/ server the page they directed to in {:path}
 * 
 * @param {string} :path    the path to which the user is trying to reach in the browser
 * 
 * @returns The HTML page which the user is trying to reach. 
 */
app.get("/app/:path/", (req, res) => {
    const path = req.params.path; // Get the path user went to
    
    res.sendFile(`public/${path}.html`, {root: __dirname }); // Send the requried page specified in {path}
});


/**
 * Summary.
 * Firebase API handler. Sends async request to firebase code to access/modify data in database
 * 
 * @param {string} :method        the type of http request happening
 * @param {string} :collection    which collection in the database to access
 * @param {string} :docID         which document in the collection to modify
 * @see /firebase.js
 * 
 * @returns the JSON result of the specificed request
 */
app.use("/app/:method/:collection/:docID", async (req, res) => {
    // Get the required parameters
    const docID = req.params.docID;
    const collection = req.params.collection;
    const method = req.params.method;

    let result; // The result of whatever database transaction occuring

    if (method == "get") { // if the {method} is 'get' then retrieve the document specified in {collection}/{docID}

        // Send async request to the Firebase
        result = await getDocument(collection, docID);
    } else if (method == "post") { // if the {method} is 'set' then create the document specified in {collection}/{docID}
        
        // Get body data from request
        const data = req.body.data;
        result = await setDocument(collection, docID, data);
    } else if (method == "patch") { // if the {method} is 'patch' then update the document specified in {collection}/{docID}
        const data = req.body.data;
        result = await updateDocument(collection, docID, data);
    } else if (method == "delete") {  // if the {method} is 'delete' then delete the document specified in {collection}/{docID}
        result = await deleteDocument(collection, docID);
    }

    // Send JSON result back
    res.status(200).json(result);
});