# Shared-Todo

By Bradley Killins  
(and Andrew Miller)  
for SODV2201 - Web Programming

A To-do app that allows sharing between users.  
Frontend built with React.  
Backend built using node.js, express.js and connects to an Atlas MongoDb

## Setup

After cloning please run "npm install" to get required packages.  
Start both the backend and frontend servers.  
(node app.js in backend directory and npm start for frontend directory)  
The Backend **MUST** use port **5000**, which is it's default port.  
Currently the CORS policy on the backend is set so that request from localhost:5080  
will be allowed.  
If the frontend starts on a different port than **3000** you need  
to change the config file of the backend server.  

Logins to test:  

username: brad@app.com  
password: 123456789

username: andrew@app.com  
password: 123456789

### Code

#### Frontend

Most of the heavy lifting is done inside of the List Component.  
State is managed by the parent to the components that need access  
to the shared state. In most cases that is the List Component.

#### Backend

All database related code, including the queries, are kept in the database.js file.  
The code that runs on each route in the routes.js file is stored in the apis folder.  
Simple authentication is done using Express Session, and protected routes use the  
IsAuth function in the verify.js file as middleware.
