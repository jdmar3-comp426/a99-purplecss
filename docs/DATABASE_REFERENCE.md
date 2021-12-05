# Database

 We utilize Google Firebase which is a NoSQL database. The backend interacts with the database when querying the data.

## Imported Functions Required to use Firebase libaries:
- `initializeApp`
- `getFirestore`
- `doc`, `getDoc`, `setDoc`, `deleteDoc`


## initFirebase
<hr>

Description: Initializes our database and saves a reference to that database

Params: `None`

Return: `None`

> Only needs to be called once during initialization

## getDocument
<hr>

Params: 
- `{string} collection`: The name of the collection the document is retrieved from
- `{string} docID` : The identifiying id of the document being retrieved

Return: `{object}`: Javascript object containing the information from the retrieved document

Description: Sends an asynchronous request to the FirebaseAPI retrieving a document from collection of documents

## setDocument
<hr>

Params: 
- `{string} collection`: The name of the collection the document is retrieved from
- `{string} docID` : The identifiying id of the document being set

- `{object} data`: The data being saved into the document

Return: `{object}`: Javascript object containing the set/updated data

Description: Sends an asynchronous request to the FirebaseAPI creating document in the database

## updateDocument
<hr>

Params: 
- `{string} collection`: The name of the collection the document is retrieved from
- `{string} docID` : The identifiying id of the document being updating

- `{object} data`: The data being saved into the document

Return: `{object}`: Javascript object containing update in the document

Description: Sends an asynchronous request to the FirebaseAPI creating document in the database

## deleteDocument
<hr>

Params: 
- `{string} collection`: The name of the collection the document is retrieved from
- `{string} docID` : The identifiying id of the document being updating

Return: `{object}`: Javascript object containing the collection and document id with a status flag
```
return {
    `collection`: collection,
    `docID`: docID,
    `deleted`: true
};

```

Description: Sends an asynchronous request to the FirebaseAPI deleting a document in the database







