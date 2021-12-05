# Backend

The backend API communicates with our database to store user account infromation and player statistics.

API endpoint is hosted at: `localhost:3000`.

## Imported Libaries Required:
- `express`
- `bodyParser`
- [The database](DATABASE_REFERENCE.md)

## listen
<hr>

Params: 
- `{string} HTTP_PORT`: String with the port that HTTP will be served on

Description: Starts the server on port: `{HTTP_PORT}`

## get
<hr>

### /
Description: Loads the root directory through the browser. Loads the index/home page

### /app/
Description: Loads the root directory through the browser. Loads the index/home page

### /app/:path/
Description: This method will route the user to the given HTML page is given in the path variable.

`:path` can be substititued with the following pages:
 - login
 - play
 - profile
 - rules
 - signup
## /app/:method/:collection/:docID
`:method` can be substititued with the following pages:
 - get 
 - post
 - patch
 - delete
### /app/get/:collection/:docID
Description: retrieve the document specified in `:collection`/`:docID`


<hr>

### /app/post/:collection/:docID
Description: create the document specified in `:collection`/`:docID`


<hr>

### /app/patch/:collection/:docID
Description: update the document specified in `:collection`/`:docID`

<hr>

### /app/delete/:collection/:docID
Description: delete the document specified in `:collection`/`:docID`