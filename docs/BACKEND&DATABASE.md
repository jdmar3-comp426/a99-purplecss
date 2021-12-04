# DATABASE

 We utilize Google Firebase which is a NoSQL database. The backend interacts with the database when querying the data.

## Imported Functions Required to use Firebase libaries:
- `initializeApp()`
- `getFirestore()`
- `doc(), getDoc(), setDoc(), deleteDoc()`


## `initFirebase()`
<hr>

Params: `None`

Return: `None`

Description: Initializes our database and saves a reference to that database

## `getDocument()`
<hr>

Params: 
- `{string} collection`: The collection the document is retrieved from
- `{string} docID` : The identifiying index of the document being retrieved

Return: `{object}`: Javascript object containing the information from the retrieved document

Description: Exports a function that sends an asynchronous request to the FirebaseAPI retrieving a document from collection of documents

## `setDocument()`
<hr>

Params: 
- `{string} collection`: The collection the document is retrieved from
- `{string} docID` : The identifiying index of the document being set

- `{object} data`: The data being saved into the document

Return: `{object}`: Javascript object containing the set/updated data

Description: Exports a function that sends an asynchronous request to the FirebaseAPI updating a previosuly retrieved document in the database

## `updateDocument()`
<hr>

Params: 
- `{string} collection`: The collection the document is retrieved from
- `{string} docID` : The identifiying index of the document being updating

- `{object} data`: The data being saved into the document

Return: `{object}`: Javascript object containing update in the document

Description: Exports a function that sends an update to the data in the document

## `deleteDocument()`
<hr>

Params: 
- `{string} collection`: The collection the document is retrieved from
- `{string} docID` : The identifiying index of the document being updating

Return: `{object}`: Javascript object containing the collection and document id with a status flag
```
return {
    `collection`: collection,
    `docID`: docID,
    `deleted`: true
};

```

Description: Exports a function that deletes a document in the database


<br>

<br/>


# BACKEND

The backend communicates with our database to store user account infromation and player statistics.

## Imported Libaries Required:
- `express()`
- `bodyParser()`

## `listen()`
<hr>

Params: 
- `{string} HTTP_PORT`: String with the port that HTTP will be served on


Return: `NONE`

Description: Starts the server on port: `{HTTP_PORT}`

## `get("/") `
<hr>

Params: 
- `{string} HTTP_PORT`: String with the port that HTTP will be served on


Return: The root HTML page

Description: Loads the root directory through the browser. Loads the index/home page







