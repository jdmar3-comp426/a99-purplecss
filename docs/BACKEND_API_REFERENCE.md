# BACKEND

The backend API communicates with our database to store user account infromation and player statistics.

API endpoint is hosted at: `localhost:3000`.

## Imported Libaries Required:
- `express`
- `bodyParser`
- [The database](DATABASE_REFERENCE.md)

## `listen`
<hr>

Params: 
- `{string} HTTP_PORT`: String with the port that HTTP will be served on

Description: Starts the server on port: `{HTTP_PORT}`


## User Routing

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


## post

## patch

## delete